import toast from 'react-hot-toast';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

const defaultSlideContent = {
	index: 0,
	levelText: 'Level 1',
	badge: 'Free Gift',
	imageUrl: 'https://www.spacenk.com/dw/image/v2/ABCE_PRD/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw24f078e7/products/C_RET_SUPP/UK200049892_C_RET_SUPP.jpg?sw=292&amp;sh=292',
	title: 'COMPLIMENTARY Molecular Silk Amino Hydrating Cleanser (25ml)',
	copy: `When you spend <span class="ge-only" data-original-price="60">£60</span> on Allies of Skin`,
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
	slides: [defaultSlideContent],
};

export const createSlidesStore = (initState: State = defaultInitState) => {
	return createStore<Slides>()(
		persist(
			(set) => ({
				...initState,
				addSlide: () => set((state) => ({ slides: [...state.slides, { ...state.slides[state.slides.length - 1], index: state.slides.length + 1 }] })),
				updateSlide: (newSlide) => set((state) => ({ slides: state.slides.map((slide) => (slide.index === newSlide?.index ? newSlide : slide)) })),
				deleteSlide: (index) => {
					set((state) => {
						if (state.slides.length === 1) {
							toast.error('Cannot delete the last slide');
							return state;
						}
						return { slides: state.slides.filter((slide) => slide.index !== index) };
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
