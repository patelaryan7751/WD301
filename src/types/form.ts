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