import { formData } from "./form";
export interface previewAnswers {
    questionId: number;
    id: number;
    question: string;
    answer: string | string[];
}

export type optionanswer = {
    label: string,
    value: string
}
export type answerapi = {
    form_field: number,
    value: string | string[]
}


type initialStateAction = {
    type: "initialStateACTION"
    value: formData
}
export type PreviewAction = initialStateAction

type initialAnswerAction = {
    type: "initialAnswerACTION"
    value: formData
}

type updateAnswerFieldAction = {
    type: "updateAnswerFieldACTION"
    value: string | string[]
    id: number

}

type updateOptionAnswerFieldAction = {
    type: "updateOptionAnswerFieldACTION"
    options: string[]
    id: number
}

type updateSingleOptionAnswerFieldAction = {
    type: "updateSingleOptionAnswerFieldACTION"
    value: string
    id: number
}

type resetAnswerFieldAction = {
    type: "resetAnswerFieldACTION"
    formFieldState: formData
}

export type PreviewAnsAction = initialAnswerAction | updateAnswerFieldAction | updateOptionAnswerFieldAction | updateSingleOptionAnswerFieldAction | resetAnswerFieldAction



