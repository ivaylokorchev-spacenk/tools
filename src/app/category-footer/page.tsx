import CategoryFooterBuilder from '@/components/CategoryFooterBuilder/CategoryFooterBuilder';

export const metadata = {
	title: 'Tools - Category Footer Builder',
	description: 'Category Footer Builder',
};

export default function Home() {
	return (
		<main className="tw-flex tw-min-h-screen tw-items-center tw-justify-between tw-px-24 tw-py-10 tw-bg-white">
			<CategoryFooterBuilder />
		</main>
	);
}
