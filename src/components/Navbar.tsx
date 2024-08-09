import Link from 'next/link';

const links = [
	{
		href: '/',
		text: 'Home',
	},
	{
		href: '/category-footer',
		text: 'Category Footer Builder',
	},
	{
		href: '/gwp-carousel',
		text: 'GWP Carousel Builder',
	},
];

const Navbar = () => {
	return (
		<nav className="tw-flex tw-bg-slate-800 tw-text-white tw-mx-auto tw-gap-x-5 tw-px-24 tw-py-3 tw-border-b">
			{links.map((link) => (
				<Link
					className="tw-text-white hover:tw-text-gray-300"
					key={link.href}
					href={link.href}
				>
					{link.text}
				</Link>
			))}
		</nav>
	);
};

export default Navbar;
