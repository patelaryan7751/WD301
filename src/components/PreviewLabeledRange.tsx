import React, { useState } from 'react';

export default function PreviewLabeledRange(props: { kind: string, max: number, min: number, qnum: number, id: number, label: string, type: string, placeholder: string, updateFieldCB: (value: string, id: number) => void, value: string | string[] }) {
    return (

        <div className="flex gap-2">
            <label className="text-xl">{props.label}</label>
            <input className='border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' name={props.label} id={props.label} max={props.max} min={props.min} type={props.type} placeholder={props.placeholder} value={Number(props.value)} onChange={(e) => {
                props.updateFieldCB(String(e.target.value), props.qnum)
            }} />
        </div>
    )
}
