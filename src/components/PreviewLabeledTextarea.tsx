import React from 'react';

export default function PreviewLabeledTextarea(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateFieldCB: (value: string, id: number) => void, value: string | string[] }) {
    return (
        <div className="flex gap-2">
            <label className="text-xl">{props.label}</label>
            <textarea className='border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' placeholder={props.placeholder} value={props.value} onChange={(e) => {
                props.updateFieldCB(e.target.value, props.qnum)
            }} ></textarea>
        </div>
    )
}