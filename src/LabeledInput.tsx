import React from 'react';

export default function LabeledInput(props: { id: number, label: string, type: string, placeholder: string }) {
    return (
        <React.Fragment key={props.id}>
            <label className="text-xl">{props.label}</label>
            <input className='border-2 border-gray-200 rounded-lg p-2 m-2 w-full' type={props.type} placeholder={props.placeholder} />
        </React.Fragment>
    )
}
