import { useEffect } from 'react';

export function usePolyfill() {
	useEffect(() => {
		if (window && !window.snk) {
			window.snk = {
				urls: {},
			};
			window.scriptLoaderData = {};
		}
	}, []);
}
