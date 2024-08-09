// Make typescript not complain about swiper and jquery that come from snk js
export {};

declare global {
	interface Window extends Window, globalThis {
		$: any;
		snk: any;
		scriptLoaderData: any;
	}
	interface HTMLDivElement extends HTMLDivElement {
		swiper: any;
	}
}
