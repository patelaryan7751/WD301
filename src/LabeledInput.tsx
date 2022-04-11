import React from 'react';

export default function LabeledInput(props: { id: number, label: string, type: string, placeholder: string, removeFieldCB: (id: number) => void, updateFieldCB: (value: string, id: number) => void, value: string }) {
    return (
        <div className="gap-2">
            {props.type === "text" ? <div><label className="text-xl">Question type:text</label>
                <input className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' type={props.type} placeholder={props.placeholder} value={props.label} onChange={(e) => {
                    props.updateFieldCB(e.target.value, props.id)
                }} />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
                <hr style={{ borderWidth: 8 }} />
            </div> : props.type === "textarea" ?
                <div>
                    <label className="text-xl">Question type:textarea</label>
                    <textarea className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' placeholder={props.placeholder} value={props.label} onChange={(e) => {
                        props.updateFieldCB(e.target.value, props.id)
                    }} ></textarea>
                </div> : props.type === "email" ? <div><label className="text-xl">Question type:email</label>
                    <input className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' placeholder={props.placeholder} value={props.label} onChange={(e) => {
                        props.updateFieldCB(e.target.value, props.id)
                    }} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
                    <hr style={{ borderWidth: 8 }} />
                </div> : ""}
        </div>
    )
}
