'use client';
import { SlidesStoreProvider } from '@/providers/slides-store-provider';
import GWPCarouselPageHTML from '@/components/pages/gwp-page';
import GWPCarouselPageJSON from '@/components/pages/gwp-page-json';
import Script from 'next/script';
import { useState } from 'react';

export default function Page() {
	const [type, setType] = useState('html');

	return (
		<>
			<style scoped={true}>
				{`
                @import url(https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/css/font.css);
                @import url(https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/css/global.css);
                @import url(https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/css/icons.css);
                i {
                    visibility: visible !important;
                }
            `}
			</style>
			<div className="tw-flex tw-justify-end tw-items-center tw-p-4">
				<label className="tw-ml-auto tw-relative tw-flex tw-items-center tw-p-2 tw-text-sm tw-gap-4">
					<span className={`tw-text-gray-700 ${type === 'html' ? 'tw-font-bold' : ''}`}>HTML</span>
					<button
						type="button"
						role="switch"
						aria-checked={type === 'json'}
						onClick={() => setType(type === 'html' ? 'json' : 'html')}
						className={`tw-w-10 tw-h-5 tw-bg-gray-300 tw-rounded-full tw-relative tw-transition-colors tw-duration-300 tw-ease-in-out
				${type === 'json' ? 'tw-bg-green-400' : ''}`}
					>
						<span
							className={`tw-absolute tw-top-0.5 tw-left-1 tw-w-4 tw-h-4 tw-bg-white tw-rounded-full tw-shadow-md tw-transition-transform tw-duration-300
					${type === 'json' ? 'tw-translate-x-4' : ''}`}
						/>
					</button>
					<span className={`tw-text-gray-700 ${type === 'json' ? 'tw-font-bold' : ''}`}>JSON</span>
				</label>
			</div>
			<SlidesStoreProvider>{type === 'html' ? <GWPCarouselPageHTML /> : <GWPCarouselPageJSON />}</SlidesStoreProvider>
			<Script
				src="https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/js/main.js"
				strategy="lazyOnload"
			/>
		</>
	);
}
