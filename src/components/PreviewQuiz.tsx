import { navigate } from "raviger";
import React, { useState, useEffect, useReducer } from "react";
import PreviewLabeledInput from "./PreviewLabeledInput";
import PreviewLabeledOptions from "./PreviewLabeledOptions";
import { FetchField, formData, formField, RecievedFormData } from "../types/form"
import { answerapi, optionanswer, PreviewAction, PreviewAnsAction, previewAnswers } from "../types/preview"
import PreviewLabeledRadio from "./PreviewLabeledRadio";
import PreviewLabeledTextarea from "./PreviewLabeledTextarea";
import PreviewLabeledEmail from "./PreviewLabeledEmail";
import PreviewLabeledSingleOptions from "./PreviewLabeledSingleOptions";
import PreviewLabeledRange from "./PreviewLabeledRange";
import { Pagination } from "../types/common";
import { getFields, getForm, submitForm } from "../utils/apiUtils";
import { setFormFields } from "../utils/helper";
import { Store } from 'react-notifications-component';

const initialFormFields: formField[] = [];


const initialAnswerState: (currentForm: formData) => previewAnswers[] = (currentForm) => {
    console.log(currentForm.formFields.map((field, index) => {
        return { id: index, question: field.label, answer: field.value, questionId: field.id, }
    }))
    return currentForm.formFields.map((field, index) => {
        return { id: index, question: field.label, answer: field.value, questionId: field.id, }
    })
}


const reducer = (state: formData, action: PreviewAction) => {
    switch (action.type) {
        case "initialStateACTION":
            return action.value
    }

}

const reducerAnswer = (state: previewAnswers[], action: PreviewAnsAction) => {
    switch (action.type) {
        case "initialAnswerACTION":
            console.log(initialAnswerState(action.value))
            return initialAnswerState(action.value)
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

export default function PreviewQuiz(props: { formId: number }) {
    const [state, dispatch] = useReducer(reducer, {
        id: props.formId,
        title: "Untitled Form",
        formFields: initialFormFields
    })
    const [currentQuestion, setCurrentQuestionState] = useState(0)
    const [answers, dispatchAnswer] = useReducer(reducerAnswer, [])
    useEffect(() => {
        state.id !== props.formId && navigate(`/preview/${props.formId}`)
    }, [state.id, props.formId])

    const fetchForms = async (id: number) => {
        try {
            const data: RecievedFormData = await getForm(id)
            const dataField: Pagination<FetchField> = await getFields(id)

            let formFieldsdata: formField[] = setFormFields(dataField.results)
            let formData = {
                id: id,
                title: data.title,
                formFields: formFieldsdata
            }
            console.log(formData)
            dispatchAnswer({ type: "initialAnswerACTION", value: formData })
            dispatch({ type: "initialStateACTION", value: formData })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchForms(props.formId)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    const submitFormApi = async () => {
        const allanswer: answerapi[] = answers.map((answer) => {
            return {
                form_field: answer.questionId,
                value: answer.answer
            }
        })
        await submitForm(props.formId, allanswer)
        navigate(`/`)
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
                        submitFormApi()
                        Store.addNotification({
                            title: "Form Successfully Submited !!!",
                            message: `Form of name: ${state.title} is submitted!`,
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                                duration: 5000,
                                onScreen: true
                            }
                        });

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