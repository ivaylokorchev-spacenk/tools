import Link from 'next/link';

export default function Home() {
	return (
		<main className="tw-min-h-[85vh]">
			<h1 className="tw-text-4xl tw-text-center tw-mt-5">Tools</h1>
			<div className="tw-grid tw-grid-cols-1 tw-gap-5 tw-container tw-max-w-md tw-mt-5 tw-mx-auto tw-place-items-center">
				<Link
					href="/category-footer"
					className="tw-bg-gray-700 tw-p-5 tw-text-center tw-text-white tw-hover:tw-bg-gray-800 tw-w-full tw-h-full"
				>
					Category Footer Builder
				</Link>
				<Link
					href="/gwp-carousel"
					className="tw-bg-gray-700 tw-p-5 tw-text-center tw-text-white tw-hover:tw-bg-gray-800 tw-w-full tw-h-full"
				>
					GWP Carousel Builder
				</Link>
			</div>
		</main>
	);
}
