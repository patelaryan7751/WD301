import React, { useState, useEffect } from "react";
import LabeledInput from "../LabeledInput";

interface formField {
    id: number,
    label: string,
    type: string,
    value: string,
    placeholder: string
}
const initialFormFields: formField[] = [
    { id: 1, label: "First Name", type: "text", placeholder: "John", value: "" },
    { id: 2, label: "Last Name", type: "text", placeholder: "Doe", value: "" },
    { id: 3, label: "Email", type: "email", placeholder: "hey@example.com", value: "" },
    { id: 4, label: "Phone Number", type: "tel", placeholder: "7751931940", value: "" },
    { id: 5, label: "Date of Birth", type: "date", placeholder: "", value: "" }
];
const initialState: () => formField[] = () => {
    const formFieldsJSON = localStorage.getItem("formFields")
    const persistantFormFields = formFieldsJSON ? JSON.parse(formFieldsJSON) : initialFormFields
    return persistantFormFields
}
const saveFormData = (currentState: formField[]) => {
    localStorage.setItem("formFields", JSON.stringify(currentState))
}
export function Form(props: { closeFormCB: () => void }) {
    const [state, setState] = useState(initialState())
    const [newField, setNewField] = useState("");
    useEffect(() => {
        console.log("Component Mounted");
        const oldTitle = document.title;
        document.title = "Form Editor";
        return () => {
            console.log("Component unMounted");
            document.title = "React App";
        }
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormData(state);
            console.log("data saved", state)
        }, 1000)
        return () => {
            console.log("timer stopped")
            clearTimeout(timeout)
        }

    }, [state])
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
                <button onClick={(_) => {
                    saveFormData(state)
                }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Save</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={props.closeFormCB}>close Form</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={resetForm}>Reset Form</button>

            </div>
        </div>
    )
}