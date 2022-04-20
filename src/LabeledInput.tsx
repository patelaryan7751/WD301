import React, { useEffect, useState } from 'react';
import { FetchField } from './types/form';
import { updateFieldApi } from './utils/apiUtils';

export default function LabeledInput(props: { formId: number, id: number, label: string, type: string, placeholder: string, removeFieldCB: (id: number) => void, updateFieldCB: (value: string, id: number) => void, value: string }) {
    const [field, setField] = useState(props.label)
    const updateField = async () => {
        try {
            let updatedField: FetchField = {
                id: props.id,
                kind: "TEXT",
                label: field,
                options: [],
                value: ""
            }
            console.log(updatedField)
            await updateFieldApi(props.formId, props.id, updatedField)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timeout = setTimeout(() => {
            updateField()
            console.log("data savedlllll")
        }, 1000)
        return () => {
            console.log("timer stopped")
            clearTimeout(timeout)
        }
    }, [field]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="gap-2">
            {props.type === "text" ? <div><label htmlFor='question' className="text-xl">Question type:text</label>
                <input aria-label="question field" className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' type={props.type} placeholder={props.placeholder} value={field} onChange={(e) => {
                    setField(e.target.value)
                    props.updateFieldCB(e.target.value, props.id)
                }} />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
                <hr style={{ borderWidth: 8 }} />
            </div> : props.type === "textarea" ?
                <div>
                    <label htmlFor='question' className="text-xl">Question type:textarea</label>
                    <textarea aria-label="question field" className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' placeholder={props.placeholder} value={props.label} onChange={(e) => {
                        props.updateFieldCB(e.target.value, props.id)
                    }} ></textarea>
                </div> : props.type === "email" ? <div><label htmlFor='question' className="text-xl">Question type:email</label>
                    <input aria-label="question field" className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' placeholder={props.placeholder} value={props.label} onChange={(e) => {
                        props.updateFieldCB(e.target.value, props.id)
                    }} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove</button>
                    <hr style={{ borderWidth: 8 }} />
                </div> : ""}
        </div>
    )
}
