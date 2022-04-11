import React from 'react';

export default function LabeledOption(props: { id: number, options: string[], label: string, updateOptionCB: (value: string, id: number, fieldId: number) => void, updateQuestionCB: (value: string, id: number) => void, removeFieldCB: (id: number) => void, removeOptionCB: (fieldid: number, optionid: number) => void, value: string[] }) {
    return (
        <div className="gap-2 divide-dotted">
            <h1 className='text-bold'>Question type:dropdown</h1>
            <input type="text" className="w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={props.label} onChange={(e) => {
                props.updateQuestionCB(e.target.value, props.id)
            }} />
            <h1 className='text-bold'>Options:</h1>
            {
                props.options.map((option, index) => <div key={`${props.id}option${index}`}> <input type="text" id={`${props.id}option${index}`} key={`${props.id}option${index}`} className="w-128 border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
                    props.updateOptionCB(e.target.value, Number(e.target.id.split("option")[1]), props.id)
                }} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeOptionCB(props.id, index)} >Remove</button>
                </div>)
            }
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove Question</button>
            <hr style={{ borderWidth: 8 }} />
        </div>
    )
}
