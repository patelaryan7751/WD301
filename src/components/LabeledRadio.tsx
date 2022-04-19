import React, { useEffect, useState } from 'react';
import { updateFieldApi } from '../utils/apiUtils';

export default function LabeledRadio(props: { formId: number, id: number, options: string[], label: string, placeholder: string, updateOptionCB: (value: string, id: number, fieldId: number) => void, updateQuestionCB: (value: string, id: number) => void, removeFieldCB: (id: number) => void, removeOptionCB: (fieldid: number, optionid: number) => void, value: string }) {
    const [field, setField] = useState(props.label)
    const [options, setOptions] = useState<string[]>(props.options)
    const updateField = async () => {
        try {
            let updatedField = {
                id: props.id,
                kind: "RADIO",
                label: field,
                options: options,
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
    }, [field, options])
    return (
        <div className="gap-2 divide-dotted">
            <h1 className='text-bold'>Question type:radio</h1>
            <input type="text" className="w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={props.label} onChange={(e) => {
                setField(e.target.value)
                props.updateQuestionCB(e.target.value, props.id)
            }} />
            <h1 className='text-bold'>Options:</h1>
            {
                props.options.map((option, index) => <div key={`${props.id}option${index}`}> <input type="text" id={`${props.id}option${index}`} key={`${props.id}option${index}`} className="w-128 border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
                    setOptions(options.map((option, i) => {
                        if (i === index) {
                            return e.target.value
                        }
                        return option
                    }))
                    props.updateOptionCB(e.target.value, Number(e.target.id.split("option")[1]), props.id)

                }} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => {
                        setOptions(options.filter((option, i) => i !== index)
                        )
                        props.removeOptionCB(props.id, index)
                    }} >Remove</button>
                </div>)
            }
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => props.removeFieldCB(props.id)}>Remove Question</button>
            <hr style={{ borderWidth: 8 }} />
            <hr style={{ borderWidth: 8 }} />
        </div>
    )
}
