import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import PreviewLabeledInput from "./PreviewLabeledInput";
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
export function PreviewQuiz(props: { formId: number }) {
    const [state, setState] = useState({
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    const [currentQuestion, setCurrentQuestionState] = useState(0)
    useEffect(() => {
        state.id !== props.formId && navigate(`/preview/${state.id}`)
    }, [state.id, props.formId])

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

    const updateField = (value: string, id: number) => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
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
        })
    }

    const resetForm = () => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                return ({
                    ...field,
                    value: ""
                })
            })
        }
        )
    }


    return (
        <div>
            <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
                <h1 className="text-xl">{state.title}</h1>
                <div>
                    Question {currentQuestion + 1}:
                    <br />

                    {state.formFields.map((field, index) =>
                        index === currentQuestion ? <PreviewLabeledInput id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} value={field.value} updateFieldCB={updateField} /> : ""
                    )}
                </div>

                <div className='flex gap-4'>
                    {/* <button onClick={(_) => {
                        saveFormData(state)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Save</button>
                    <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'>Home</Link> */}
                    {state.formFields.length - 1 !== Number(currentQuestion) ? <button onClick={() => {
                        saveFormData(state)
                        setCurrentQuestionState(Number(currentQuestion + 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Next</button> : ""}
                    {Number(currentQuestion) !== 0 ? <button onClick={() => {
                        saveFormData(state)
                        setCurrentQuestionState(Number(currentQuestion - 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Back</button> : ""}
                    {state.formFields.length - 1 === Number(currentQuestion) ? <button onClick={() => {
                        saveFormData(state)
                        navigate(`/`)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Submit</button> : ""}
                    <button onClick={() => {
                        resetForm()
                        setCurrentQuestionState(0)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Reset Quiz</button>


                </div>
            </div>
        </div>
    )
}