import { FetchField, formField } from "../types/form"
import { User } from "../types/userType"
import { me } from "./apiUtils"

export const setFormFields = (data: FetchField[]) => {
    const fieldData: formField[] = data.map((field) => {
        switch (field.kind) {
            case "TEXT":
                return {
                    kind: "text",
                    id: field.id,
                    label: field.label,
                    type: "text",
                    placeholder: field.label,
                    value: field.value
                }
            case "DROPDOWN":
                return {
                    kind: "singleDropdown",
                    id: field.id,
                    label: field.label,
                    placeholder: field.label,
                    value: [],
                    options: field.options
                }
            case "RADIO":
                return {
                    kind: "radio",
                    id: field.id,
                    label: field.label,
                    placeholder: field.label,
                    value: "",
                    options: field.options,
                    type: "radio"
                }
            default:
                return {
                    kind: "text",
                    id: field.id,
                    label: field.label,
                    type: "text",
                    placeholder: field.label,
                    value: field.value
                }

        }

    }

    )
    return fieldData
}

export const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
    const currentUser = await me();
    setCurrentUser(currentUser)
}