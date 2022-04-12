import React from 'react';

export default function LabeledRange(props: { id: number, max: number, min: number, label: string, type: string, placeholder: string, removeFieldCB: (id: number) => void, updateFieldCB: (value: string, id: number) => void, value: string, updateMaxCB: (value: number, id: number) => void, updateMinCB: (value: number, id: number) => void }) {
    return (
        <div className="gap-2">
            <div><label className="text-xl">Question type:range</label>
                <input className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' type="text" placeholder={props.placeholder} value={props.label} onChange={(e) => {
                    props.updateFieldCB(e.target.value, props.id)
                }} />

                <h1>Max Range</h1>

                <input type="number" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="max range" value={props.max} onChange={(e) => {
                    props.updateMaxCB(Number(e.target.value), props.id)
                }} />

                <h1>Min Range</h1>

                <input type="number" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="min range" value={props.min} onChange={(e) => {
                    props.updateMinCB(Number(e.target.value), props.id)
                }} />

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
                <hr style={{ borderWidth: 8 }} />
            </div>
        </div>
    )
}