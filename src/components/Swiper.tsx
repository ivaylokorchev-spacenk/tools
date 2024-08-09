'use client';

import { useEffect, useRef, useState } from 'react';
import { type Slide } from '@/store/slides-store';
import { useSlidesStore } from '@/providers/slides-store-provider';

function SwiperStatic({ slides }: { slides: Slide[] }) {
	return (
		<div className="gwp-pdp-slider custom-swiper-buttons custom-swiper-buttons--overlap position-relative">
			<div
				className="swiper swiper-slider"
				data-carousel-type="GWP_PDP"
			>
				<div className="swiper-wrapper">
					{slides.map((slide, i) => (
						<Swiper.Slide
							key={i}
							{...slide}
							isStatic={true}
						/>
					))}
				</div>
				<div className="swiper-pagination position-static"></div>
			</div>
			<div className="swiper-button-prev gwp-pdp-slider__prev d-none"></div>
			<div className="swiper-button-next gwp-pdp-slider__next d-none"></div>
		</div>
	);
}

//TODO: Add state management so that the slides can be edited without having to be passed down as props
export default function Swiper() {
	const swiperRef = useRef<HTMLDivElement>(null);
	const slides = useSlidesStore((state) => state.slides);

	useEffect(() => {
		if (window && window.$) {
			if (swiperRef.current && !swiperRef.current.classList.contains('swiper-initialized')) {
				window.$(swiperRef.current).swiper();
			} else {
				if (swiperRef.current?.swiper) {
					swiperRef.current?.swiper.update();
				}
			}
		}
	}, [slides]);

	return (
		<div className="gwp-pdp-slider custom-swiper-buttons custom-swiper-buttons--overlap position-relative tw-bg-white">
			<div
				ref={swiperRef}
				className="swiper swiper-slider"
				data-carousel-type="GWP_PDP"
			>
				<div className="swiper-wrapper">
					{slides.map((slide, i) => (
						<Swiper.Slide
							key={i}
							{...slide}
						/>
					))}
				</div>
				<div className="swiper-pagination position-static"></div>
			</div>
			<div className="swiper-button-prev gwp-pdp-slider__prev d-none"></div>
			<div className="swiper-button-next gwp-pdp-slider__next d-none"></div>
		</div>
	);
}

const SwiperSlide = ({ badge, copy, subCopy, title, imageUrl, index, levelText, isStatic }: Slide) => {
	const { deleteSlide, updateSlide } = useSlidesStore((state) => state);

	const [badgeText, setBadgeText] = useState(badge);
	const [titleText, setTitleText] = useState(title);
	const [copyText, setCopyText] = useState(copy);
	const [subCopyText, setSubCopyText] = useState(subCopy);
	const [imageSrc, setImageSrc] = useState(imageUrl);
	const [levelTextStr, setLevelText] = useState(levelText);
	const [showInput, setShowInput] = useState(false);

	useEffect(() => {
		updateSlide({
			index,
			badge: badgeText,
			title: titleText,
			copy: copyText,
			subCopy: subCopyText,
			imageUrl: imageSrc,
			levelText: levelTextStr,
		});
	}, [badgeText, titleText, copyText, subCopyText, imageSrc, levelTextStr, index]);

	return (
		<div className="swiper-slide">
			{!isStatic && (
				<button
					className="tw-absolute -tw-top-0 tw-right-0 tw-bg-rose-600 tw-size-8 tw-rounded-md tw-text-white tw-font-semibold tw-z-10"
					onClick={() => deleteSlide(index)}
				>
					<i className="icon-snk-trash"></i>
				</button>
			)}
			<h5 className="gwp-pdp-slider__badge">
				<span
					className="gwp-pdp-slider__badge-copy"
					onBlur={(e) => {
						setBadgeText(e.currentTarget.textContent || '');
					}}
					contentEditable
					suppressContentEditableWarning={true}
				>
					{badgeText}
				</span>
				<i className="gwp-pdp-slider__icon icon-snk-gift-bold"></i>
			</h5>
			<div className="gwp-pdp-slider__banner gap-x-0 pt-0">
				<div className="gwp-pdp-slider__copy p-0">
					<div className="mt-2 mt-md-3 px-3 py-2 py-md-3">
						<h5
							className="mb-1"
							contentEditable
							suppressContentEditableWarning={true}
							onBlur={(e) => setLevelText(e.currentTarget.textContent || '')}
						>
							{levelTextStr}
						</h5>
						<h4
							contentEditable
							suppressContentEditableWarning={true}
							onBlur={(e) => setTitleText(e.currentTarget.textContent || '')}
						>
							{titleText}
						</h4>
						<p
							contentEditable
							suppressContentEditableWarning={true}
							onBlur={(e) => setCopyText(e.currentTarget.textContent || '')}
							className="font-weight-bold mb-2"
						>
							{copyText}
						</p>
						<p
							contentEditable
							suppressContentEditableWarning={true}
							onBlur={(e) => setSubCopyText(e.currentTarget.textContent || '')}
							className="d-none d-md-block mb-2"
						>
							{subCopyText}
						</p>
					</div>
				</div>
				<div
					className={`gwp-pdp-slider__img ${!isStatic ? 'tw-relative' : ''}`}
					style={{ height: '177px', width: '177px' }}
					onMouseEnter={() => setShowInput(true)}
					onMouseLeave={() => setShowInput(false)}
				>
					<img
						src={imageSrc}
						alt="thumbnail"
						className="w-100"
					/>
					{showInput && (
						<textarea
							style={{ width: 150, height: 150 }}
							className="tw-text-xs tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
							value={imageSrc}
							rows={5}
							onChange={(e) => setImageSrc(e.target.value)}
						></textarea>
					)}
				</div>
				<i
					className="gwp-pdp-slider__tooltip icon-snk-info tooltip-info d-md-none"
					role="tooltip"
					aria-label={subCopyText}
					title=""
					data-placement="top"
					data-toggle="tooltip"
					data-html="true"
					data-trigger="hover"
					data-original-title={subCopyText}
				></i>
			</div>
		</div>
	);
};

Swiper.Slide = SwiperSlide;
Swiper.Static = SwiperStatic;