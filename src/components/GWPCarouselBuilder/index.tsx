'use client';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import Swiper from './Swiper';
import { usePolyfill } from './usePolyfill';

export const defaultSlideContent = {
	index: 0,
	levelText: 'Level 1',
	badge: 'Free Gift',
	imageUrl: 'https://www.spacenk.com/dw/image/v2/ABCE_PRD/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw24f078e7/products/C_RET_SUPP/UK200049892_C_RET_SUPP.jpg?sw=292&amp;sh=292',
	title: 'COMPLIMENTARY Molecular Silk Amino Hydrating Cleanser (25ml)',
	copy: `When you spend <span class="ge-only" data-original-price="60">£60</span> on Allies of Skin`,
	subCopy: 'Adds to bag automatically.',
};

export default function CarouselBuilder() {
	const [slides, setSlides] = useState([defaultSlideContent]);

	function decodeHtml(html: string) {
		if (typeof document === 'undefined') return html;
		var txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	function addAnotherSlide() {
		// Use previous slide as template, essentially cloning it
		setSlides((prevState) => [...prevState, { ...prevState[prevState.length - 1], index: prevState.length }]);
	}

	usePolyfill();
	return (
		<div className="tw-flex tw-flex-col tw-gap-y-12 tw-container tw-mx-auto tw-p-20 tw-md:tw-p-32">
			<div className="tw-flex tw-flex-col tw-gap-y-12 tw-container tw-overflow-hidden">
				<Swiper
					slides={slides}
					setSlides={setSlides}
				/>
			</div>
			<button
				onClick={addAnotherSlide}
				className="tw-bg-emerald-500 tw-p-2 tw-px-3 tw-w-fit tw-text-md tw-text-white tw-rounded-md tw-font-semibold"
			>
				ADD SLIDE
			</button>
			<textarea
				onClick={(e) => {
					e.currentTarget.select();
					toast.success('Copied to clipboard');
					navigator.clipboard.writeText(e.currentTarget.value);
				}}
				cols={20}
				rows={20}
				onChange={() => {}}
				value={decodeHtml(ReactDOMServer.renderToString(<Swiper.Static slides={slides} />))
					.replaceAll('contentEditable="true"', '') // Remove contentEditable attribute
					.replace(/<link\s+rel="preload"[^>]*>/gi, '')} // Remove preload link tags injected by React
			></textarea>
		</div>
	);
}
