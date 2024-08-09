'use client';

import { useEffect, useRef, useState } from 'react';
import CollapseInputs from './CollapseInputs';
import LinkInputs from './LinkInputs';
import toast from 'react-hot-toast';
import { styles } from '@/utils/CategoryFooter';
type Collapse = {
	title: string;
	copy: string;
};

type Link = {
	id: number;
	text: string;
	imagePath: string;
	articleId: string;
};

const createLink = (link: Link) => {
	if (!link.text || !link.imagePath || !link.articleId) return '';
	return `
	<a class="d-flex align-items-center gap-x-4 text-decoration-none flex-grow-1" title="${link.text}" href="$httpsUrl('Page-Show', 'cid', '${link.articleId}')$">
		<img width="74" height="74" src="${link.imagePath}?$staticlink$" alt="${link.text}" />
		<div class="d-flex align-items-center flex-grow-1">
			<span class="h2 font-amari line-clamp-3 flex-grow-1 mb-0">${link.text}</span>
			<i class="icon-snk-arrow-right"></i>
		</div>
	</a>`;
};

const createCollapse = (collapse: Collapse, index: number) => {
	if (!collapse.title || !collapse.copy) return '';
	return `
<div class="border-bottom">
	<button data-toggle="collapse" class="d-flex h5 mb-0 justify-content-between btn p-0 collapsed text-left w-100 py-2" data-target="#slot-bottom-accordion-${index}">
		${collapse.title}
		<i class="icon-snk-plus mr-0"></i>
		<i class="icon-snk-minus mr-0"></i>
	</button>
	<div class="collapse" id="slot-bottom-accordion-${index}">
		<p class="mb-3">
			${collapse.copy}
		</p>
	</div>
</div>`;
};

const generateHTML = (links: Link[], collapses: Collapse[], title: string, forIframe: boolean) => {
	return `${styles}
		<div class="bg-stark search-slot-bottom">
			<div class="container d-grid grid-cols-repeat-1 grid-cols-repeat-md-3 gap-x-8 gap-y-4">
				${links.map(createLink).join('')}
			</div>
			<div class="container mx-auto d-flex flex-column">
				${title && `<h3 class="mb-2 mb-md-3">${title}</h3>`}
				${collapses.map(createCollapse).join('')}
			</div>
		</div>`.replace(forIframe ? /<img(.*?)src="(.*?)"(.*?)\/>/g : '', forIframe ? '<img$1src="https://placehold.co/110x110/EEE/31343C?text=Placeholder"$3/>' : ''); // remove image src from iframe to not throw errors;
};

const writeHTML = (doc: Document, links: Link[], collapses: Collapse[], title: string) => {
	doc.open();
	//TODO: find a better way to add the css for previews maybe fetch?!?
	doc.write('<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>');
	doc.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>');
	doc.write('<link rel="stylesheet" href="https://www.spacenk.com/on/demandware.static/Sites-spacenkgb-Site/-/en_GB/v1707383070106/css/global.css">');
	doc.write(generateHTML(links, collapses, title, true));
	doc.close();
};

const CategoryFooterBuilder = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [links, setLinks] = useState(
		Array.from({ length: 3 }, (e, i) => ({
			id: i + 1,
			text: `Link ${i + 1} Title`,
			imagePath: `Link ${i + 1} imagePath`,
			articleId: `Link ${i + 1} article ID`,
		}))
	);
	const [collapses, setCollapses] = useState(
		Array.from({ length: 2 }, (e, i) => ({
			title: `Collapse Element ${i + 1} Title`,
			copy: `Collapse Element ${i + 1} Copy`,
		}))
	);
	const [title, setTitle] = useState('Accordion title');
	const addCollapse = () => {
		setCollapses((old) => [...old, { title: 'New Collapse Title', copy: 'New Collapse Copy' }]);
	};

	useEffect(() => {
		const doc = iframeRef.current?.contentDocument;
		if (doc) {
			writeHTML(doc, links, collapses, title);
		}
	}, [links, collapses]);

	return (
		<div className="tw-w-full">
			<h2 className="tw-mb-5">Links</h2>
			<div className="tw-flex tw-flex-col tw-w-full">
				<div className="tw-grid tw-grid-cols-3 tw-gap-x-3">
					{links.map((link) => (
						<LinkInputs
							key={link.id}
							link={link}
							links={links}
							setLinks={setLinks}
						/>
					))}
				</div>
				<hr className="tw-my-6" />
				<div>
					<h2 className="tw-mb-2">Accordion</h2>
					<h3>Title</h3>
					<input
						className="tw-mb-3"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<h3 className="">Collapse elements</h3>
					<div className="tw-text-xs tw-mb-3 tw-leading-5">
						To add link in the copy just add a<code>{`<a>`}</code> tag. In the href attribute of the a tag for a category link add
						<code>{`$httpsUrl('Search-Show', 'cgid', '<CATEGORY_ID_HERE>')$`}</code>
						for a product link add
						<code>{`$httpsUrl('Product-Show', 'pid', '<PRODUCT_ID_HERE>')$`}</code>
						for a page or content link add
						<code>{`$httpsUrl('Page-Show', 'cid', '<PAGE_OR_CONTENT_ID_HERE>')$`}</code>
						<p className="tw-mt-2">
							Examples
							<code>{`<a href="$httpsUrl('Search-Show', 'cgid', 'makeup')$">Category Link</a>`}</code>
							<code>{`<a href="$httpsUrl('Product-Show', 'pid', 'MUK200041575')$">Product Link</a>`}</code>
							<code>{`<a href="$httpsUrl('Page-Show', 'cid', 'beauty-events')$">Page Link</a>`}</code>
							<br />
						</p>
					</div>
					<div className="tw-flex tw-flex-wrap tw-gap-5">
						{collapses.map((collapse, index) => (
							<CollapseInputs
								key={index}
								index={index}
								collapse={collapse}
								collapses={collapses}
								setCollapses={setCollapses}
							/>
						))}
					</div>
					<button
						className="tw-p-3 tw-bg-green-300 tw-rounded-md"
						onClick={addCollapse}
					>
						Add a collapse element
					</button>
				</div>
				<hr className="tw-my-6" />
				<h3 className="tw-text-3xl">Preview</h3>
				<p className="tw-text-[12px]">
					Link&apos;s Images are placeholders only, will be replaced with the correct image path in the code below. <br />
					Keep in mind this is just to give a rough idea of what it would look like. <br />
					It is NOT 100% accurate. Some elements like icons, fonts & images will be missing
				</p>
				<iframe
					className="tw-w-full tw-resize-x tw-h-full tw-mt-5 tw-min-h-[400px]  tw-border-2 tw-border-dashed tw-border-gray-300 tw-bg-white"
					ref={iframeRef}
				></iframe>
				<hr className="tw-my-10" />
				<h3 className="tw-text-3xl tw-mb-3">HTML</h3>
				<div className="tw-flex">
					<textarea
						onClick={(e) => {
							e.currentTarget.select();
							toast.success('Copied to clipboard');
							navigator.clipboard.writeText(e.currentTarget.value);
						}}
						className="tw-w-full tw-flex-1 tw-text-xs tw-min-w-[50%] tw-max-h-[400px] tw-border tw-p-3 tw-cursor-pointer"
						cols={100}
						rows={50}
						readOnly
						value={generateHTML(links, collapses, title, false)}
					></textarea>
				</div>
			</div>
		</div>
	);
};

export default CategoryFooterBuilder;
