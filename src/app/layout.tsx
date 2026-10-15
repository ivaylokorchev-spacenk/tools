import './globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { SlidesStoreProvider } from '@/providers/slides-store-provider';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata: Metadata = {
	title: 'Tools - Home',
	description: 'Tools',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${jost.variable} ${jost.className}`}>
				<Toaster />
				<Navbar />
				<SlidesStoreProvider>{children}</SlidesStoreProvider>
				<footer className="tw-px-24 tw-text-center tw-py-10 tw-flex tw-items-center tw-justify-center tw-bg-slate-800 tw-text-white">
					<p className="tw-text-white">
						Any questions or feedback feel free to{' '}
						<a
							className="tw-underline tw-text-white hover:tw-text-gray-300"
							href="mailto:ivaylo.korchev@spacenk.com"
						>
							email me - ivaylo.korchev@spacenk.com
						</a>
					</p>
				</footer>
			</body>
		</html>
	);
}
