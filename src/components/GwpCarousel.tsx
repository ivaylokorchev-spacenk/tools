'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type Slide } from '@/store/slides-store';
import { useSlidesStore } from '@/providers/slides-store-provider';

function GwpCarouselSkeleton() {
	return (
		<div className="tw-py-8 tw-px-3 tw-bg-white">
			<div className="tw-relative tw-border-gray-200 tw-border-2 tw-animate-pulse tw-h-52 tw-flex tw-justify-between">
				<div className="tw-h-8 tw-bg-gray-200 tw-w-32 tw-mb-4 tw-absolute -tw-top-0 -tw-translate-y-1/2 tw-left-2" />
				<div className="tw-p-6 tw-w-full">
					<div className="tw-h-4 tw-bg-gray-200 tw-rounded-md tw-w-4/12" />
					<div className="tw-h-5 tw-bg-gray-200 tw-rounded-md tw-w-11/12 tw-mt-2" />
					<div className="tw-h-5 tw-bg-gray-200 tw-rounded-md tw-w-10/12 tw-mt-1" />
					<div className="tw-h-5 tw-bg-gray-200 tw-rounded-md tw-w-5/12 tw-mt-1" />
				</div>
				<div className="tw-h-full tw-aspect-square tw-bg-gray-200" />
			</div>
		</div>
	);
}

type SlideViewProps = Slide & {
	isStatic?: boolean;
};

function GwpGiftIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			aria-hidden
			className="tw-shrink-0"
		>
			<rect x="3" y="8" width="18" height="13" rx="1" />
			<path d="M12 8v13M3 12h18" />
			<path d="M12 8c-2.2-2.8-7-2.8-7 0h7zm0 0c2.2-2.8 7-2.8 7 0h-7z" />
		</svg>
	);
}

/** contentEditable + React children re-escapes HTML on every render (e.g. & → &amp;). Sync via ref instead. */
function EditableHtml({
	className,
	html,
	onChange,
}: {
	className?: string;
	html: string;
	onChange: (html: string) => void;
}) {
	const ref = useRef<HTMLParagraphElement>(null);
	const isFocusedRef = useRef(false);

	useEffect(() => {
		if (isFocusedRef.current || !ref.current) return;
		if (ref.current.innerHTML !== html) {
			ref.current.innerHTML = html;
		}
	}, [html]);

	return (
		<p
			ref={ref}
			className={className}
			contentEditable
			suppressContentEditableWarning
			onFocus={() => {
				isFocusedRef.current = true;
			}}
			onBlur={(e) => {
				isFocusedRef.current = false;
				onChange(e.currentTarget.innerHTML || '');
			}}
		/>
	);
}

function GwpSlideView({ badge, copy, subCopy, title, imageUrl, index, levelText, isStatic }: SlideViewProps) {
	const { deleteSlide, updateSlide } = useSlidesStore((state) => state);

	const [badgeText, setBadgeText] = useState(badge);
	const [titleText, setTitleText] = useState(title);
	const [copyText, setCopyText] = useState(copy);
	const [subCopyText, setSubCopyText] = useState(subCopy);
	const [imageSrc, setImageSrc] = useState(imageUrl);
	const [levelTextStr, setLevelText] = useState(levelText);
	const [showInput, setShowInput] = useState(false);

	useEffect(() => {
		if (isStatic) return;
		updateSlide({
			index,
			badge: badgeText,
			title: titleText,
			copy: copyText,
			subCopy: subCopyText,
			imageUrl: imageSrc,
			levelText: levelTextStr,
		});
	}, [badgeText, titleText, copyText, subCopyText, imageSrc, levelTextStr, index, isStatic, updateSlide]);

	return (
		<div className="gwp-slide-preview tw-relative tw-border tw-border-[#f6e0e0] tw-bg-white tw-font-jost tw-text-neutral-900">
			{!isStatic && (
				<button
					type="button"
					className="tw-absolute tw-top-2 tw-right-2 tw-bg-rose-600 tw-size-7 tw-rounded-md tw-text-white tw-text-sm tw-font-semibold tw-z-10 tw-cursor-pointer"
					onClick={() => deleteSlide(index)}
					aria-label="Delete slide"
				>
					×
				</button>
			)}
			<div
				className="tw-absolute tw-left-4 tw-top-0 tw-z-10 tw-inline-flex -tw-translate-y-1/2 tw-items-center tw-gap-2 tw-border tw-bg-[#f6e0e0] tw-border-[#f6e0e0] tw-text-neutral-900 tw-text-sm tw-font-semibold tw-uppercase tw-px-3 tw-py-1"
				style={{ backgroundColor: '#f6e0e0', borderColor: '#f6e0e0' }}
			>
				{isStatic ? (
					<span>{badgeText}</span>
				) : (
					<span
						className="tw-cursor-text"
						contentEditable
						suppressContentEditableWarning
						onBlur={(e) => setBadgeText(e.currentTarget.textContent || '')}
					>
						{badgeText}
					</span>
				)}
				<GwpGiftIcon />
			</div>
			<div className="tw-grid tw-min-h-[11rem] tw-grid-cols-[1fr_145px] md:tw-grid-cols-[1fr_175px]">
				<div className="tw-pt-7 tw-pb-5 tw-pl-4 tw-pr-3">
					{levelTextStr ? (
						isStatic ? (
							<p className="tw-text-base tw-mb-2 tw-text-neutral-600">{levelTextStr}</p>
						) : (
							<p
								className="tw-text-base tw-mb-2 tw-text-neutral-600 tw-cursor-text"
								contentEditable
								suppressContentEditableWarning
								onBlur={(e) => setLevelText(e.currentTarget.textContent || '')}
							>
								{levelTextStr}
							</p>
						)
					) : null}
					{isStatic ? (
						<h4 className="tw-text-base md:tw-text-lg tw-font-normal tw-uppercase tw-leading-snug tw-mb-3">{titleText}</h4>
					) : (
						<h4
							className="tw-text-base md:tw-text-lg tw-font-normal tw-uppercase tw-leading-snug tw-mb-3 tw-cursor-text"
							contentEditable
							suppressContentEditableWarning
							onBlur={(e) => setTitleText(e.currentTarget.textContent || '')}
						>
							{titleText}
						</h4>
					)}
					{isStatic ? (
						<p className="tw-text-sm tw-leading-snug tw-mb-2 gwp-slide-copy" dangerouslySetInnerHTML={{ __html: copyText }} />
					) : (
						<EditableHtml
							className="tw-text-sm tw-leading-snug tw-mb-2 tw-cursor-text gwp-slide-copy"
							html={copyText}
							onChange={setCopyText}
						/>
					)}
					{isStatic ? (
						<p className="tw-text-sm tw-font-normal tw-hidden md:tw-block">{subCopyText}</p>
					) : (
						<p
							className="tw-text-sm tw-font-normal tw-hidden md:tw-block tw-cursor-text"
							contentEditable
							suppressContentEditableWarning
							onBlur={(e) => setSubCopyText(e.currentTarget.textContent || '')}
						>
							{subCopyText}
						</p>
					)}
					<p className="tw-text-xs tw-text-neutral-600 tw-mt-2 md:tw-hidden" title={subCopyText}>
						{subCopyText}
					</p>
				</div>
				<div
					className={`tw-relative tw-h-full tw-min-h-[11rem] tw-self-stretch tw-overflow-hidden ${!isStatic ? 'tw-cursor-grab' : ''}`}
					onMouseEnter={() => !isStatic && setShowInput(true)}
					onMouseLeave={() => !isStatic && setShowInput(false)}
				>
					<img src={imageSrc} alt="" className="tw-absolute tw-inset-0 tw-size-full tw-object-cover tw-object-center" />
					{showInput && (
						<textarea
							style={{ width: 140, height: 140 }}
							className="tw-text-xs tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-cursor-text"
							value={imageSrc}
							rows={5}
							onChange={(e) => setImageSrc(e.target.value)}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

const SWIPE_THRESHOLD_PX = 48;

/** Grab on swipe surfaces; editable/interactive children keep normal cursors. */
const swipeViewportCursorClass =
	'tw-cursor-grab [&_[contenteditable]]:tw-cursor-text [&_textarea]:tw-cursor-text [&_button]:tw-cursor-pointer';
const swipeViewportDraggingCursorClass =
	'tw-cursor-grabbing [&_[contenteditable]]:tw-cursor-text [&_textarea]:tw-cursor-text [&_button]:tw-cursor-pointer';

function GwpCarouselEditor({ readOnly = false }: { readOnly?: boolean }) {
	const { slides } = useSlidesStore((state) => state);
	const [activeIndex, setActiveIndex] = useState(0);
	const [dragOffset, setDragOffset] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);
	const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
	const dragAxisRef = useRef<'none' | 'horizontal' | 'vertical'>('none');

	useEffect(() => {
		if (activeIndex >= slides.length) {
			setActiveIndex(Math.max(0, slides.length - 1));
		}
	}, [slides.length, activeIndex]);

	const goToSlide = useCallback(
		(index: number) => {
			setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
		},
		[slides.length]
	);

	const isInteractiveTarget = (target: EventTarget | null) => {
		if (!(target instanceof HTMLElement)) return false;
		return Boolean(
			target.closest('[contenteditable="true"]') ||
				target.closest('textarea') ||
				target.closest('button') ||
				target.closest('input')
		);
	};

	const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		if (event.button !== 0 || isInteractiveTarget(event.target)) return;
		dragStartRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
		dragAxisRef.current = 'none';
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const start = dragStartRef.current;
		if (!start || start.pointerId !== event.pointerId) return;

		const deltaX = event.clientX - start.x;
		const deltaY = event.clientY - start.y;

		if (dragAxisRef.current === 'none') {
			if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
			dragAxisRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
			if (dragAxisRef.current === 'vertical') {
				dragStartRef.current = null;
				event.currentTarget.releasePointerCapture(event.pointerId);
				return;
			}
			setIsDragging(true);
		}

		if (dragAxisRef.current !== 'horizontal') return;

		const atStart = activeIndex === 0 && deltaX > 0;
		const atEnd = activeIndex === slides.length - 1 && deltaX < 0;
		const resisted = atStart || atEnd ? deltaX * 0.35 : deltaX;
		setDragOffset(resisted);
	};

	const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
		const start = dragStartRef.current;
		if (!start || start.pointerId !== event.pointerId) return;

		if (dragAxisRef.current === 'horizontal') {
			const deltaX = event.clientX - start.x;
			if (deltaX < -SWIPE_THRESHOLD_PX) goToSlide(activeIndex + 1);
			else if (deltaX > SWIPE_THRESHOLD_PX) goToSlide(activeIndex - 1);
		}

		dragStartRef.current = null;
		dragAxisRef.current = 'none';
		setIsDragging(false);
		setDragOffset(0);
		event.currentTarget.releasePointerCapture(event.pointerId);
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goToSlide(activeIndex - 1);
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goToSlide(activeIndex + 1);
		}
	};

	if (slides.length === 0) return <GwpCarouselSkeleton />;

	const hasMultiple = slides.length > 1;

	return (
		<div className="tw-bg-white tw-font-jost">
			<div
				ref={viewportRef}
				className={`tw-overflow-x-clip tw-overflow-y-visible tw-outline-none tw-touch-pan-y tw-cursor-default ${
					isDragging ? `${swipeViewportDraggingCursorClass} tw-select-none` : hasMultiple ? swipeViewportCursorClass : ''
				}`}
				tabIndex={hasMultiple ? 0 : -1}
				role="region"
				aria-roledescription="carousel"
				aria-label="Gift with purchase slides"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onKeyDown={onKeyDown}
			>
				<div
					className={`tw-flex ${isDragging ? '' : 'tw-transition-transform tw-duration-300 tw-ease-out'}`}
					style={{ transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))` }}
				>
					{slides.map((slide, slideIndex) => (
						<div
							key={slide.index}
							className="tw-min-w-full tw-shrink-0 tw-px-1 tw-pt-4 tw-pb-1"
							aria-hidden={slideIndex !== activeIndex}
						>
							<GwpSlideView {...slide} isStatic={readOnly} />
						</div>
					))}
				</div>
			</div>
			{hasMultiple && (
				<div className="tw-flex tw-justify-center tw-gap-2 tw-mt-4 tw-px-2 tw-pb-1">
					{slides.map((s, i) => (
						<button
							key={s.index}
							type="button"
							aria-label={`Go to slide ${i + 1}`}
							aria-current={i === activeIndex ? 'true' : undefined}
							className={`tw-size-2 tw-rounded-full tw-cursor-pointer ${i === activeIndex ? 'tw-bg-gray-900' : 'tw-bg-gray-300'}`}
							onClick={() => goToSlide(i)}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function GwpCarouselExport({ slides }: { slides: Slide[] }) {
	return (
		<div className="gwp-pdp-slider gwp-pdp-slider--reverse custom-swiper-buttons custom-swiper-buttons--overlap position-relative">
			<div className="swiper swiper-slider" data-carousel-type="GWP_PDP">
				<div className="swiper-wrapper">
					{slides.map((slide, i) => (
						<div className="swiper-slide" key={i}>
							<h5 className="gwp-pdp-slider__badge">
								<span className="gwp-pdp-slider__badge-copy">{slide.badge}</span>
								<i className="gwp-pdp-slider__icon icon-snk-gift-bold"></i>
							</h5>
							<div className="gwp-pdp-slider__banner gap-x-0 pt-0">
								<div className="gwp-pdp-slider__copy p-0">
									<div className="mt-2 mt-md-3 px-3 py-2 py-md-3">
										<h5 className="my-1">{slide.levelText}</h5>
										<h4>{slide.title}</h4>
										<p className="font-weight-bold mb-2" dangerouslySetInnerHTML={{ __html: slide.copy }} />
										<p className="d-none d-md-block mb-0">{slide.subCopy}</p>
									</div>
								</div>
								<div className="gwp-pdp-slider__img">
									<img src={slide.imageUrl} alt="thumbnail" className="w-100" />
								</div>
								<i
									className="gwp-pdp-slider__tooltip icon-snk-info tooltip-info lh-0 d-md-none"
									role="tooltip"
									aria-label={slide.subCopy}
									title=""
									data-placement="top"
									data-toggle="tooltip"
									data-html="true"
									data-trigger="hover"
									data-original-title={slide.subCopy}
								></i>
							</div>
						</div>
					))}
				</div>
				<div className="swiper-pagination position-static"></div>
			</div>
			<div className="swiper-button-prev gwp-pdp-slider__prev d-none"></div>
			<div className="swiper-button-next gwp-pdp-slider__next d-none"></div>
		</div>
	);
}

/** Renders the Space NK HTML snippet (preview only — site CSS/JS apply on production). */
export function GwpHtmlExportPreview({ html }: { html: string }) {
	if (!html) return null;
	return (
		<div
			className="gwp-export-preview tw-bg-white tw-p-8 tw-border tw-border-gray-100 tw-font-jost"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

type GwpCarouselComponent = typeof GwpCarouselEditor & { Export: typeof GwpCarouselExport };

const GwpCarousel = GwpCarouselEditor as GwpCarouselComponent;
GwpCarousel.Export = GwpCarouselExport;

export default GwpCarousel;
