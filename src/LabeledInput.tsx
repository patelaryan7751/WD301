import React from 'react';

export default function LabeledInput(props: { id: number, label: string, type: string, placeholder: string, removeFieldCB: (id: number) => void, updateFieldCB: (value: string, id: number) => void, value: string }) {
    return (
        <div className="flex gap-2">
            <label className="text-xl">{props.label}</label>
            <input className='border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' type={props.type} placeholder={props.placeholder} value={props.value} onChange={(e) => {
                props.updateFieldCB(e.target.value, props.id)
            }} />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
        </div>
    )
}
