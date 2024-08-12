'use client';
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import Swiper from '@/components/Swiper';
import { usePolyfill } from '@/utils/usePolyfill';
import { SlidesStoreProvider, useSlidesStore } from '@/providers/slides-store-provider';
import { decodeHtml } from '@/utils';
import { useMemo, useRef } from 'react';

export default function GWPCarouselPage() {
	const { addSlide, slides } = useSlidesStore((state) => state);
	const html = useMemo(() => {
		return decodeHtml(
			ReactDOMServer.renderToString(
				<SlidesStoreProvider>
					<Swiper.Static slides={slides} />
				</SlidesStoreProvider>
			)
		)
			.replaceAll('contentEditable="true"', '')
			.replace(/<link\s+rel="preload"[^>]*>/gi, '');
	}, [slides]);
	usePolyfill();
	return (
		<div className="tw-flex tw-flex-col tw-gap-y-4 tw-container tw-max-w-5xl tw-mx-auto tw-p-12">
			<div className="tw-flex tw-flex-col tw-gap-y-4 tw-container tw-overflow-hidden">
				<div>
					<h4>Preview & edit</h4>
					<p className="tw-text-xs">Click on each copy and edit directly. Hover over the image to view and edit the image url.</p>
				</div>
				<div className="tw-p-8 tw-bg-white">
					<Swiper />
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
				<TextArea html={html} />
			</div>
			<div>
				<h4>Preview</h4>
				<div
					className="tw-bg-white"
					dangerouslySetInnerHTML={{ __html: html }}
				></div>
			</div>
		</div>
	);
}

const TextArea = ({ html }: { html: string }) => {
	const slides = useSlidesStore((state) => state.slides);

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
