import React, { useState } from "react";
import LabeledInput from "../LabeledInput";
const formFields = [
    { id: 1, label: "First Name", type: "text", placeholder: "John", value: "" },
    { id: 2, label: "Last Name", type: "text", placeholder: "Doe", value: "" },
    { id: 3, label: "Email", type: "email", placeholder: "hey@example.com", value: "" },
    { id: 4, label: "Phone Number", type: "tel", placeholder: "7751931940", value: "" },
    { id: 5, label: "Date of Birth", type: "date", placeholder: "", value: "" }
];
export function Form(props: { closeFormCB: () => void }) {
    const [state, setState] = useState(formFields)
    const [newField, setNewField] = useState("");
    const addField = () => {
        setState([
            ...state,
            {
                id: Number(new Date()), label: newField, type: "text", placeholder: newField, value: ""
            }
        ])
        setNewField("")
    }
    const removeField = (id: number) => {
        setState(
            state.filter(field => field.id !== id)
        )
    }
    const updateField = (value: string, id: number) => {
        setState(
            state.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        value: value
                    })

                }
                return ({
                    ...field
                })
            })
        )
    }
    const resetForm = () => {

        setState(
            state.map((field) => {
                return ({
                    ...field,
                    value: ""
                })
            })
        )
    }
    return (
        <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
            <div>
                {state.map((field) =>
                    <LabeledInput id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                )}
            </div>
            <div className="flex gap-2">
                <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={addField} >Add Field</button>

            </div>
            <div className='flex gap-4'>
                <input className="rounded-md bg-sky-600 mx-2 my-3 px-3 py-2 text-slate-100 text-xl" type="submit" value="Submit" />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={props.closeFormCB}>close Form</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={resetForm}>Reset Form</button>

            </div>
        </div>
    )
}