import React from 'react';

type Link = {
	id: number;
	text: string;
	imagePath: string;
	articleId: string;
};
type Props = {
	link: Link;
	links: Link[];
	setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
};

const LinkInputs = ({ link, links, setLinks }: Props) => {
	return (
		<div
			key={link.id}
			className="tw-border tw-p-3 tw-flex tw-flex-col tw-gap-y-3"
		>
			<h5 className="tw-border-b">Link {link.id} </h5>
			<div className="tw-flex tw-flex-col">
				<label>Text</label>
				<input
					type="text"
					value={link.text}
					onChange={(e) =>
						setLinks((old) => {
							return old.map((l) => {
								if (l.id === link.id) {
									return {
										...l,
										text: e.target.value,
									};
								}
								return l;
							});
						})
					}
				/>
			</div>
			<div className="tw-flex tw-flex-col">
				<label>Image path</label>
				<input
					type="text"
					value={link.imagePath}
					onChange={(e) => {
						setLinks((old) => {
							return old.map((l) => {
								if (l.id === link.id) {
									return {
										...l,
										imagePath: e.target.value,
									};
								}
								return l;
							});
						});
					}}
				/>
			</div>
			<div className="tw-flex tw-flex-col">
				<label>Article id</label>
				<input
					type="text"
					value={link.articleId}
					onChange={(e) => {
						setLinks((old) => {
							return old.map((l) => {
								if (l.id === link.id) {
									return {
										...l,
										articleId: e.target.value,
									};
								}
								return l;
							});
						});
					}}
				/>
			</div>
		</div>
	);
};

export default LinkInputs;
