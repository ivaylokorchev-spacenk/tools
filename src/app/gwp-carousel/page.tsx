import GWPCarousel from '@/components/GWPCarouselBuilder';
import Script from 'next/script';
export const metadata = {
	title: 'Tools - GWP Carousel Builder',
	description: 'GWP Carousel Builder',
};

export default function GWPCarouselPage() {
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
			<GWPCarousel />
			<Script
				src="https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1723104263170/js/main.js"
				strategy="lazyOnload"
			/>
		</>
	);
}
