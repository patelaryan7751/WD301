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
    value: formData
}
export type PreviewAction = initialStateAction

type initialAnswerAction = {
    type: "initialAnswerACTION"
    value: previewAnswers[]
}

type updateAnswerFieldAction = {
    type: "updateAnswerFieldACTION"
    value: previewAnswers[]
}

type updateOptionAnswerFieldAction = {
    type: "updateOptionAnswerFieldACTION"
    value: previewAnswers[]
}

type updateSingleOptionAnswerFieldAction = {
    type: "updateSingleOptionAnswerFieldACTION"
    value: previewAnswers[]
}

type resetAnswerFieldAction = {
    type: "resetAnswerFieldACTION"
    value: previewAnswers[]
}

export type PreviewAnsAction = initialAnswerAction | updateAnswerFieldAction | updateOptionAnswerFieldAction | updateSingleOptionAnswerFieldAction | resetAnswerFieldAction



