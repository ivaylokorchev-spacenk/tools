import React from 'react';
type Collapse = {
	title: string;
	copy: string;
};
type Props = {
	collapse: Collapse;
	setCollapses: React.Dispatch<React.SetStateAction<Collapse[]>>;
	collapses: Collapse[];
	index: number;
};

const CollapseInputs = ({ collapse, setCollapses, index }: Props) => {
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCollapses((old) =>
			old.map((c, i) => {
				if (i === index) {
					return {
						...c,
						title: e.target.value,
					};
				}
				return c;
			})
		);
	};
	const onChangeCopy = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCollapses((old) =>
			old.map((c, i) => {
				if (i === index) {
					return {
						...c,
						copy: e.target.value,
					};
				}
				return c;
			})
		);
	};
	return (
		<div
			key={index}
			className="tw-border tw-p-3 tw-my-2 tw-flex tw-flex-col tw-gap-y-3 tw-min-w-[400px]"
		>
			<div className="tw-flex tw-flex-col">
				<h5 className="tw-mb-2 tw-border-b tw-pb-2">Collapse {index + 1}</h5>
				<label>Title</label>
				<input
					type="text"
					value={collapse.title}
					onChange={onChangeTitle}
				/>
			</div>
			<div className="tw-flex tw-flex-col">
				<label>Copy</label>
				<textarea
					rows={6}
					value={collapse.copy}
					onChange={onChangeCopy}
				/>
			</div>
			<button
				className="tw-bg-red-500 tw-p-1 tw-w-fit tw-text-xs tw-text-white tw-rounded-md"
				onClick={() => setCollapses((old) => old.filter((_, i) => i !== index))}
			>
				Remove
			</button>
		</div>
	);
};

export default CollapseInputs;
