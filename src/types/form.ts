export type formData = {
    id: number;
    title: string;
    formFields: formField[];
}
export type textFieldTypes = "text" | "email" | "date" | "radio" | "textarea" | "range";

type TextField = {
    kind: "text"
    id: number;
    label: string;
    value: string;
    placeholder: string;
    type: textFieldTypes;
}

type SingleDropdownField = {
    kind: "singleDropdown"
    id: number;
    label: string;
    value: string[];
    placeholder: string;
    options: string[];
}

type DropdownField = {
    kind: "dropdown"
    id: number;
    label: string;
    value: string[];
    placeholder: string;
    options: string[];
}

type RadioField = {
    kind: "radio"
    id: number;
    label: string;
    value: string;
    placeholder: string;
    options: string[]
    type: textFieldTypes;

}

type TextAreaField = {
    kind: "textarea"
    id: number;
    label: string;
    value: string;
    placeholder: string;
    type: textFieldTypes;

}

type RangeField = {
    kind: "range"
    id: number;
    label: string;
    value: string;
    placeholder: string;
    max: number;
    min: number;
    type: textFieldTypes;

}

type EmailField = {
    kind: "email"
    id: number;
    label: string;
    value: string;
    placeholder: string;
    type: textFieldTypes;

}

export type formField = TextField | DropdownField | RadioField | TextAreaField | EmailField | SingleDropdownField | RangeField

// Action Reducer
type InitialStateAction = {
    type: "initialStateACTION",
    value: formData
}
type AddAction = {
    type: "addFieldACTION"
    value: formField
}

type UpdateTitle = {
    type: "updateTitleACTION"
    value: string
}

type RemoveAction = {
    type: "removeFieldACTION"
    value: formField[]
}

type RemoveOptionAction = {
    type: "removeOptionACTION"
    value: formField[]
}

type UpdateFieldAction = {
    type: "updateFieldACTION"
    value: formField[]
}

type UpdateMaxAction = {
    type: "updateMaxACTION"
    value: formField[]
}

type UpdateMinAction = {
    type: "updateMinACTION"
    value: formField[]
}

type UpdateExOptionAction = {
    type: "updateExOptionACTION"
    value: formField[]
}

export type FormAction = AddAction | RemoveAction | InitialStateAction | RemoveOptionAction | UpdateFieldAction | UpdateMaxAction | UpdateMinAction | UpdateExOptionAction | UpdateTitle

