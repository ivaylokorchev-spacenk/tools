'use client';
import { SlidesStoreProvider } from '@/providers/slides-store-provider';
import GWPCarouselPage from '@/components/pages/gwp-page';
import Script from 'next/script';

export default function Page() {
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
			<SlidesStoreProvider>
				<GWPCarouselPage />
			</SlidesStoreProvider>
			<Script
				src="https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/js/main.js"
				strategy="lazyOnload"
			/>
		</>
	);
}
