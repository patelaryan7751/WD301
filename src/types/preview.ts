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


type initialStateAction = {
    type: "initialStateACTION"
    id: number
}
export type PreviewAction = initialStateAction

type initialAnswerAction = {
    type: "initialAnswerACTION"
    id: number
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



