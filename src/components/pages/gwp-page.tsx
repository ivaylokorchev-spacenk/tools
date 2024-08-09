'use client';
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import Swiper from '@/components/Swiper';
import { usePolyfill } from '@/utils/usePolyfill';
import { SlidesStoreProvider, useSlidesStore } from '@/providers/slides-store-provider';
import { decodeHtml } from '@/utils';

export default function GWPCarouselPage() {
	const addSlide = useSlidesStore((state) => state.addSlide);
	usePolyfill();
	return (
		<div className="tw-flex tw-flex-col tw-gap-y-12 tw-container tw-mx-auto tw-p-20 tw-md:tw-p-32">
			<div className="tw-flex tw-flex-col tw-gap-y-12 tw-container tw-overflow-hidden">
				<h1>Build a gwp carousel </h1>
				<h2>Preview & edit</h2>
				<Swiper />
			</div>
			<button
				onClick={addSlide}
				className="tw-bg-emerald-500 tw-p-2 tw-px-3 tw-w-fit tw-text-md tw-text-white tw-rounded-md tw-font-semibold"
			>
				ADD SLIDE
			</button>
			<h2>Code</h2>
			<TextArea />
		</div>
	);
}

const TextArea = () => {
	const slides = useSlidesStore((state) => state.slides);

	return (
		<textarea
			className="tw-text-xs"
			onClick={(e) => {
				e.currentTarget.select();
				navigator.clipboard.writeText(e.currentTarget.value);
				toast.success('Copied to clipboard');
			}}
			cols={20}
			rows={20}
			onChange={() => {}}
			value={decodeHtml(
				ReactDOMServer.renderToString(
					<SlidesStoreProvider>
						<Swiper.Static slides={slides} />
					</SlidesStoreProvider>
				)
			)
				.replaceAll('contentEditable="true"', '') // Remove contentEditable attribute
				.replace(/<link\s+rel="preload"[^>]*>/gi, '')}
		></textarea>
	);
};
