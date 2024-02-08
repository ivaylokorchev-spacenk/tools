import React from 'react'
type Collapse = {
	title: string;
	copy: string;
};
type Props = {
    collapse: Collapse,
    setCollapses: React.Dispatch<React.SetStateAction<Collapse[]>>,
    collapses: Collapse[],
    index: number
}

const CollapseInputs = ({ collapse, setCollapses, index}: Props) => {
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollapses((old) => old.map((c, i) => {
            if (i === index) {
                return {
                    ...c,
                    title: e.target.value,
                };
            }
            return c;
        }));

    }
    const onChangeCopy = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCollapses((old) => old.map((c, i) => {
            if (i === index) {
                return {
                    ...c,
                    copy: e.target.value,
                };
            }
            return c;
        }));
    }
  return (
    <div key={index} className='border p-3 my-2 flex flex-col gap-y-3'>
        <div className="flex flex-col">
            <h5 className='mb-2 border-b pb-2'>Collapse {index + 1}</h5>
            <label>Title</label>
            <input
                type="text"
                value={collapse.title}
                onChange={onChangeTitle}
            />
        </div>
        <div className="flex flex-col">
            <label>Copy</label>
            <textarea
                rows={4}
                value={collapse.copy}
                onChange={onChangeCopy}
            />
        </div>
        <button className='bg-red-500 p-1 w-fit text-xs text-white rounded-md' onClick={() => setCollapses(old => old.filter((_,i) => i !== index))}>Remove</button>
    </div>
  )
}

export default CollapseInputs