import { navigate } from "raviger";
import React, { useState, useEffect, useReducer } from "react";
import PreviewLabeledInput from "./PreviewLabeledInput";
import PreviewLabeledOptions from "./PreviewLabeledOptions";
import { formData, formField } from "../types/form"
import { optionanswer, PreviewAction, PreviewAnsAction, previewAnswers } from "../types/preview"
import PreviewLabeledRadio from "./PreviewLabeledRadio";
import PreviewLabeledTextarea from "./PreviewLabeledTextarea";
import PreviewLabeledEmail from "./PreviewLabeledEmail";
import PreviewLabeledSingleOptions from "./PreviewLabeledSingleOptions";
import PreviewLabeledRange from "./PreviewLabeledRange";

const initialFormFields: formField[] = [];
const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const initialState: (id: number) => formData = (id) => {
    console.log("start process")
    const notFoundForm = {
        questionId: id,
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
    return currentForm.formFields.map((field, index) => {
        return { id: index, question: field.label, answer: field.value, questionId: field.id, }
    })
}


const reducer = (state: formData, action: PreviewAction) => {
    switch (action.type) {
        case "initialStateACTION":
            return initialState(action.id)
    }

}

const reducerAnswer = (state: previewAnswers[], action: PreviewAnsAction) => {
    switch (action.type) {
        case "initialAnswerACTION":
            return initialAnswerState(initialState(action.id))
        case "updateAnswerFieldACTION":
            return state.map((answer) => {
                if (answer.id === Number(action.id)) {
                    let currentField = { ...answer, answer: action.value }
                    return currentField
                }
                return answer
            })
        case "updateOptionAnswerFieldACTION":
            return state.map((answer) => {
                console.log(answer.id, Number(action.id))
                if (answer.questionId === Number(action.id)) {
                    return {
                        ...answer, answer: action.options
                    }
                }
                return answer
            })
        case "updateSingleOptionAnswerFieldACTION":
            return state.map((answer) => {
                if (answer.questionId === Number(action.id)) {
                    return {
                        ...answer, answer: action.value
                    }
                }
                return answer
            })
        case "resetAnswerFieldACTION":
            return action.formFieldState.formFields.map((field, index) => {
                return { id: index, question: field.label, answer: field.value, questionId: field.id }
            })
    }

}

export function PreviewQuiz(props: { formId: number }) {
    const [state, dispatch] = useReducer(reducer, {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    const [currentQuestion, setCurrentQuestionState] = useState(0)
    const [answers, dispatchAnswer] = useReducer(reducerAnswer, [])
    useEffect(() => {
        state.id !== props.formId && navigate(`/preview/${state.id}`)
    }, [state.id, props.formId])

    useEffect(() => {
        dispatch({ type: "initialStateACTION", id: props.formId })
        dispatchAnswer({ type: "initialAnswerACTION", id: props.formId })
    }, [])

    const updateField = (value: string | string[], id: number) => {
        dispatchAnswer({ type: "updateAnswerFieldACTION", value: value, id: id })
    }

    const updateOptionAns = (options: optionanswer[], id: number) => {
        let optionArr: string[] = options.map((item) => {
            return item.value
        })
        dispatchAnswer({ type: "updateOptionAnswerFieldACTION", options: optionArr, id: id })
    }


    const updateSingleOptionAns = (value: string, id: number) => {
        dispatchAnswer({ type: "updateSingleOptionAnswerFieldACTION", value: value, id: id })
    }


    const resetForm = () => {
        dispatchAnswer({ type: "resetAnswerFieldACTION", formFieldState: state })
    }
    const renderField = (question: formField, index: number) => {

        switch (question.kind) {
            case "text":
                return <PreviewLabeledInput kind={question.kind} options={[]} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={question.type} value={answers[index].answer} updateFieldCB={updateField} />
            case "dropdown":
                return <PreviewLabeledOptions kind={question.kind} options={question.options} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={""} value={answers[index].answer} updateOptionAnsCB={updateOptionAns} />
            case "singleDropdown":
                return <PreviewLabeledSingleOptions kind={question.kind} options={question.options} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={""} value={answers[index].answer} updateSingleOptionAnsCB={updateSingleOptionAns} />
            case "radio":
                return <PreviewLabeledRadio kind={question.kind} options={question.options} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={""} value={answers[index].answer} updateRadioAnsCB={updateField} />
            case "textarea":
                return <PreviewLabeledTextarea kind={question.kind} options={[]} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={question.type} value={answers[index].answer} updateFieldCB={updateField} />
            case "email":
                return <PreviewLabeledEmail kind={question.kind} options={[]} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={question.type} value={answers[index].answer} updateFieldCB={updateField} />
            case "range":
                return <PreviewLabeledRange kind={question.kind} min={question.min} max={question.max} qnum={index} id={question.id} key={question.id} label={question.label} placeholder={question.placeholder} type={question.type} value={answers[index].answer} updateFieldCB={updateField} />
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 p-4 border-solid border-gray-500">
                <h1 className="text-xl">{state.title}</h1>
                {state.formFields.length !== 0 ? <div>
                    Question {currentQuestion + 1}:
                    <br />
                    {state.formFields.map((field, index) =>
                        index === currentQuestion ? renderField(field, index) : ""
                    )}
                </div> : <div>
                    <h1 className="text-xl">No questions</h1>
                </div>
                }
                <div className='flex gap-4'>
                    {state.formFields.length - 1 !== Number(currentQuestion) && state.formFields.length !== 0 ? <button onClick={() => {
                        console.log(answers)
                        setCurrentQuestionState(Number(currentQuestion + 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Next</button> : ""}
                    {Number(currentQuestion) !== 0 ? <button onClick={() => {
                        setCurrentQuestionState(Number(currentQuestion - 1))
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Back</button> : ""}
                    {state.formFields.length - 1 === Number(currentQuestion) && state.formFields.length !== 0 ? <button onClick={() => {
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