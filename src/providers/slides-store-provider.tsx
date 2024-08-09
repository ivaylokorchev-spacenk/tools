'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import { type Slides, createSlidesStore, defaultSlideContent } from '@/store/slides-store';

export type SlidesStoreApi = ReturnType<typeof createSlidesStore>;

export const SlidesStoreContext = createContext<SlidesStoreApi | undefined>(undefined);

export interface SlidesStoreProviderProps {
	children: ReactNode;
}

export const SlidesStoreProvider = ({ children }: SlidesStoreProviderProps) => {
	const storeRef = useRef<SlidesStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createSlidesStore();
	}
	return <SlidesStoreContext.Provider value={storeRef.current}>{children}</SlidesStoreContext.Provider>;
};

export const useSlidesStore = <T,>(selector: (store: Slides) => T): T => {
	const slidesStoreContext = useContext(SlidesStoreContext);

	if (!slidesStoreContext) {
		throw new Error(`useSlidesStore must be used within SlidesStoreProvider`);
	}
	useEffect(() => {
		if (slidesStoreContext.getState().slides.length === 0) {
			slidesStoreContext.getState().addSlide();
		}
	}, []);
	return useStore(slidesStoreContext, selector);
};
