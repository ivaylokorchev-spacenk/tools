import toast from 'react-hot-toast';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export const defaultSlideContent = {
	index: 0,
	levelText: 'Level 1',
	badge: 'Free Gift',
	imageUrl: 'https://www.spacenk.com/on/demandware.static/-/Library-Sites-spacenk-global/default/dw00d6963a/pd_homepages/24_WK18/emma-lewisham-inside.jpg',
	title: 'COMPLIMENTARY Molecular Silk Amino Hydrating Cleanser (25ml)',
	copy: `When you spend <span class="ge-only" data-original-price="60" data-is-discount="true">£60</span> on Allies of Skin`,
	subCopy: 'Adds to bag automatically.',
};

export type Slide = typeof defaultSlideContent & {
	index: number;
	isStatic?: boolean;
};

type State = {
	slides: Slide[];
};

type Action = {
	addSlide: () => void;
	updateSlide: (newSlide: Slide) => void;
	deleteSlide: (index: number) => void;
};

export type Slides = State & Action;

export const defaultInitState: State = {
	slides: [],
};

export const createSlidesStore = (initState: State = defaultInitState) => {
	return createStore<Slides>()(
		persist(
			(set) => ({
				...initState,
				addSlide: () =>
					set((state) => {
						if (state.slides.length === 0) {
							return { slides: [defaultSlideContent] };
						}
						const lastSlide = state.slides[state.slides.length - 1];

						return { slides: [...state.slides, { ...lastSlide, index: lastSlide.index + 1 }] };
					}),
				updateSlide: (newSlide) => set((state) => ({ slides: state.slides.map((slide) => (slide.index === newSlide?.index ? newSlide : slide)) })),
				deleteSlide: (index) => {
					set((state) => {
						const newSlides = state.slides.filter((slide) => slide.index !== index);
						if (newSlides.length === 0) {
							toast.error('Last slide cannot be deleted');
							return { slides: state.slides };
						}
						return { slides: newSlides };
					});
				},
			}),
			{
				name: 'slides',
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({ slides: state.slides }),
			}
		)
	);
};
