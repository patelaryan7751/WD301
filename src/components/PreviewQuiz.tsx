import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import PreviewLabeledInput from "./PreviewLabeledInput";
import { formData, formField } from "../types/form"
import { previewAnswers } from "../types/preview"

const initialFormFields: formField[] = [];
const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const getLocalAnswers: () => previewAnswers[] = () => {
    const savedAnswersJSON = localStorage.getItem("savedAnswers")
    return savedAnswersJSON ? JSON.parse(savedAnswersJSON) : []
}

const saveAnswers = (localAnswers: previewAnswers[]) => {
    console.log("save")
    localStorage.setItem("savedAnswers", JSON.stringify(localAnswers))

}

const initialState: (id: number) => formData = (id) => {
    console.log("start process")
    const notFoundForm = {
        id: id,
        title: "Form Not Found",
        formFields: []
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
        return notFoundForm
    }

    return notFoundForm

}

const initialAnswerState: (currentForm: formData) => previewAnswers[] = (currentForm) => {
    const localAnswers = getLocalAnswers()
    if (localAnswers.length !== 0) {
        return localAnswers

    }
    console.log(currentForm)

    return currentForm.formFields.map((field, index) => {
        return { id: index, question: field.label, answer: field.value }
    })
}



export function PreviewQuiz(props: { formId: number }) {
    const [state, setState] = useState({
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    const [currentQuestion, setCurrentQuestionState] = useState(0)
    const [answers, setanswerState] = useState<previewAnswers[]>([])
    useEffect(() => {
        state.id !== props.formId && navigate(`/preview/${state.id}`)
    }, [state.id, props.formId])

    useEffect(() => {
        const currentForm = initialState(props.formId)
        setState(currentForm)
        const currAnswer = initialAnswerState(currentForm)
        setanswerState(currAnswer)

    }, [])




    const updateField = (value: string, id: number) => {


        setanswerState((prevanswerState) => {
            return prevanswerState.map((answer) => {
                if (answer.id === Number(id)) {
                    let currentField = { ...answer, answer: value }
                    return currentField
                }
                return answer
            })
        }
        )

    }

    const resetForm = () => {
        const resetAnswer = state.formFields.map((field, index) => {
            return { id: index, question: field.label, answer: field.value }
        })
        saveAnswers(resetAnswer)
        setanswerState(resetAnswer)


    }


    return (
        <div>
            <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
                <h1 className="text-xl">{state.title}</h1>
                {state.formFields.length !== 0 ? <div>
                    Question {currentQuestion + 1}:
                    <br />

                    {state.formFields.map((field, index) =>
                        index === currentQuestion ? <PreviewLabeledInput qnum={index} id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} value={answers[index].answer} updateFieldCB={updateField} /> : ""
                    )}
                </div> : <div>
                    <h1 className="text-xl">No questions</h1>
                </div>
                }

                <div className='flex gap-4'>

                    {state.formFields.length - 1 !== Number(currentQuestion) && state.formFields.length !== 0 ? <button onClick={() => {
                        saveAnswers(answers)
                        setCurrentQuestionState(Number(currentQuestion + 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Next</button> : ""}
                    {Number(currentQuestion) !== 0 ? <button onClick={() => {
                        saveAnswers(answers)
                        setCurrentQuestionState(Number(currentQuestion - 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Back</button> : ""}
                    {state.formFields.length - 1 === Number(currentQuestion) && state.formFields.length !== 0 ? <button onClick={() => {
                        saveAnswers(answers)
                        navigate(`/`)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Submit</button> : ""}
                    {state.formFields.length !== 0 ? <button onClick={() => {
                        resetForm()
                        setCurrentQuestionState(0)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Reset Quiz</button> : ""}


                </div>
            </div>
        </div>
    )
}