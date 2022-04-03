import { Link, navigate } from "raviger";
import React, { useState, useEffect, useRef } from "react";
import LabeledInput from "../LabeledInput";
import { formData, formField } from "../types/form"

const initialFormFields: formField[] = [];
const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const initialState: (id: number) => formData = (id) => {
    console.log("start process")
    const newForm = {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    }
    const localForms = getLocalForms();
    if (id !== 0) {


        const form = localForms.find((f) => f.id === id)
        if (form) {
            console.log("got ", form)
            return form
        }

    }
    else {


        console.log("not got ")
        saveLocalForms([...localForms, newForm])
        return newForm
    }

    return newForm

}


const saveLocalForms = (localForms: formData[]) => {
    console.log("save")
    localStorage.setItem("savedForms", JSON.stringify(localForms))

}
const saveFormData = (currentState: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
        form.id === currentState.id ? currentState : form
    )
    saveLocalForms(updatedLocalForms);

}
export function Form(props: { formId: number }) {
    const [state, setState] = useState({
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    // const [state, setState] = useState(() => initialState(props.formId))
    const [newField, setNewField] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        state.id !== props.formId && navigate(`/form/${state.id}`)
    }, [state.id, props.formId])
    useEffect(() => {
        console.log("Component Mounted");
        document.title = "Form Editor";
        titleRef.current?.focus();
        return () => {
            console.log("Component unMounted");
            document.title = "React App";
        }
    }, [])

    useEffect(() => {
        const currentForm = initialState(props.formId)
        setState(currentForm)
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
        setState({
            ...state,
            formFields: [
                ...state.formFields,
                {
                    id: Number(new Date()),
                    label: newField,
                    type: "text",
                    placeholder: newField,
                    value: ""
                }
            ]
        }
        )
        setNewField("")
    }
    const removeField = (id: number) => {
        setState({
            ...state,

            formFields: state.formFields.filter(field => field.id !== id)
        })
    }
    const updateField = (value: string, id: number) => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        label: value,
                        placeholder: value
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }


    return (
        <div>
            <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
                <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" value={state.title} onChange={(e) => {
                    setState({
                        ...state,
                        title: e.target.value,
                    })
                }}
                    ref={titleRef}
                />
                <div>

                    {state.formFields.map((field) =>
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
                    <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'>Home</Link>

                </div>
            </div>
        </div>
    )
}