import React from 'react';

export default function PreviewLabeledInput(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateFieldCB: (value: string, id: number) => void, value: string | string[] }) {
    return (
        <div className="flex gap-2">
            <label htmlFor={`${props.label}`} className="text-xl">{props.label}</label>
            <input className='border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' type={props.type} placeholder={props.placeholder} value={props.value} onChange={(e) => {
                props.updateFieldCB(e.target.value, props.qnum)
            }} />
        </div>
    )
}
