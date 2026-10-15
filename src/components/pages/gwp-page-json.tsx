'use client';
import toast from 'react-hot-toast';
import GwpCarousel from '@/components/GwpCarousel';
import { useSlidesStore } from '@/providers/slides-store-provider';
import { useMemo } from 'react';

function stripAndEscapeHtml(htmlString: string) {
	const temp = document.createElement('div');
	temp.innerHTML = htmlString;
	return temp.textContent || temp.innerText || '';
}

export default function GWPCarouselPage() {
	const { addSlide, slides } = useSlidesStore((state) => state);

	const json = useMemo(() => {
		return slides.map((slide) => {
			const { imageUrl, title, copy, subCopy, levelText, badge } = slide;
			return {
				badgeText: stripAndEscapeHtml(badge),
				subtitle: stripAndEscapeHtml(levelText),
				title: stripAndEscapeHtml(title),
				originalCopy: copy,
				copy: stripAndEscapeHtml(copy),
				subcopy: stripAndEscapeHtml(subCopy),
				imageUrl: stripAndEscapeHtml(imageUrl),
			};
		});
	}, [slides]);
	return (
		<div className="tw-flex tw-flex-col tw-gap-y-4 tw-container tw-max-w-5xl tw-mx-auto tw-p-12">
			<div className="tw-flex tw-flex-col tw-gap-y-4 tw-container">
				<div>
					<h4>Preview & edit</h4>
					<p className="tw-text-xs">Click on each copy and edit directly. Hover over the image to view and edit the image url.</p>
				</div>
				<div className="tw-p-8 tw-bg-white">
					<GwpCarousel />
				</div>
			</div>
			<button
				onClick={addSlide}
				className="tw-bg-emerald-500 tw-p-2 tw-px-3 tw-w-fit tw-text-md tw-text-white tw-rounded-md tw-font-semibold"
			>
				ADD SLIDE
			</button>
			<hr />
			<div className="tw-w-full">
				<h4>Code</h4>
				<TextArea html={JSON.stringify(json)} />
			</div>
			<div>
				<h4>Preview</h4>
				<p className="tw-text-xs tw-text-gray-500 tw-mb-2">
					Preview only, not 100% accurate, styles may differ when used on the live site. Copy and use in staging to confirm the styles.
				</p>
				<div className="tw-p-8 tw-bg-white tw-border tw-border-gray-100">
					<GwpCarousel readOnly />
				</div>
			</div>
		</div>
	);
}

const TextArea = ({ html }: { html: string }) => {
	return (
		<textarea
			className="tw-text-xs tw-w-full"
			onFocus={(e) => {
				e.currentTarget.focus();
				e.currentTarget.select();
				navigator.clipboard.writeText(e.currentTarget.value);
				toast.success('Copied to clipboard');
			}}
			cols={20}
			rows={20}
			onChange={() => {}}
			value={html}
		></textarea>
	);
};
