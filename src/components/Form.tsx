import { Link, navigate } from "raviger";
import React, { useState, useEffect, useRef, useReducer } from "react";
import LabeledInput from "../LabeledInput";
import { Pagination } from "../types/common";
import { formData, formField, FormAction, RecievedFormData, FetchField } from "../types/form"
import { addField, getFields, getForm, removeFieldApi } from "../utils/apiUtils";
import { setFormFields } from "../utils/helper";
import LabeledOption from "./LabeledOption";
import LabeledRadio from "./LabeledRadio";
import LabeledRange from "./LabeledRange";
import { Store } from 'react-notifications-component';

const initialFormFields: formField[] = [];
const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}
const Typeoptions = ["text", "dropdown", "radio"]


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



const reduce = (state: formData, action: FormAction) => {
    switch (action.type) {
        case "addFieldACTION":
            return {
                ...state,
                formFields: [
                    ...state.formFields, action.value
                ]
            }


        case "removeFieldACTION":
            return {
                ...state,
                formFields: [
                    ...action.value
                ]

            }

        case "initialStateACTION":
            return action.value
        case "removeOptionACTION":
            return {
                ...state,

                formFields: [...action.value]
            }
        case "updateFieldACTION":
            return {
                ...state,

                formFields: [...action.value]
            }
        case "updateMaxACTION":
            return {
                ...state,

                formFields: [...action.value]
            }
        case "updateMinACTION":
            return {
                ...state,

                formFields: [...action.value]
            }
        case "updateExOptionACTION":
            return {
                ...state,

                formFields: [...action.value]
            }

        case "updateTitleACTION":
            return {
                ...state,
                title: action.value,
            }

    }

}

export function Form(props: { formId: number }) {
    const [state, dispatch] = useReducer(reduce, {
        id: props.formId,
        title: "Untitled Form",
        formFields: initialFormFields
    })
    // const [state, setState] = useState(() => initialState(props.formId))
    const [newField, setNewField] = useState<string>("");
    const [newOption, setNewOption] = useState<string[]>([]);
    const [newFieldType, setNewFieldType] = useState<string>("");
    const [newMax, setNewMax] = useState<number>(100);
    const [newMin, setNewMin] = useState<number>(0);
    const titleRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        state.id !== props.formId && navigate(`/form/${props.formId}`)
    }, [state.id, props.formId])
    useEffect(() => {
        console.log("Component Mounted");
        document.title = "Form Editor";
        titleRef.current?.focus();
        return () => {
            console.log("Component unMounted");
            document.title = "React App";
        }
    }, [])
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
            dispatch({ type: "initialStateACTION", value: formData })

        }
        catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        console.log(state)
    }, [state])
    useEffect(() => {
        fetchForms(props.formId)

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    const getNewField = (): formField => {

        switch (newFieldType) {

            case "range":
                return {
                    kind: "range",
                    id: Number(new Date()),
                    label: newField,
                    type: "range",
                    value: "",
                    placeholder: newField,
                    max: newMax,
                    min: newMin
                }

            case "dropdown":
                return {
                    kind: "dropdown",
                    id: Number(new Date()),
                    label: newField,
                    placeholder: newField,
                    value: [],
                    options: newOption
                }

            case "singleDropdown":

                return {
                    kind: "singleDropdown",
                    id: Number(new Date()),
                    label: newField,
                    placeholder: newField,
                    value: [],
                    options: newOption
                }

            case "radio":

                return {
                    kind: "radio",
                    id: Number(new Date()),
                    label: newField,
                    placeholder: newField,
                    value: "",
                    options: newOption,
                    type: "radio"
                }

            case "textarea":

                return {
                    kind: "textarea",
                    id: Number(new Date()),
                    label: newField,
                    type: "textarea",
                    placeholder: newField,
                    value: ""
                }

            case "email":
                return {
                    kind: "email",
                    id: Number(new Date()),
                    label: newField,
                    type: "email",
                    placeholder: newField,
                    value: ""
                }
            default:
                return {
                    kind: "text",
                    id: Number(new Date()),
                    label: newField,
                    type: "text",
                    placeholder: newField,
                    value: ""
                }
        }

    }

    const getFetchedFields = (field: formField) => {
        switch (field.kind) {
            case "text":
                return {
                    id: field.id,
                    kind: "TEXT",
                    label: field.label,
                    options: [],
                    value: ""
                }
            case "radio":
                return {
                    id: field.id,
                    kind: "RADIO",
                    label: field.label,
                    options: newOption,
                    value: ""
                }
            case "dropdown":
                return {
                    id: field.id,
                    kind: "DROPDOWN",
                    label: field.label,
                    options: newOption,
                    value: ""
                }
            default:
                return {
                    id: field.id,
                    kind: "TEXT",
                    label: field.label,
                    options: [],
                    value: ""
                }


        }

    }

    const addNewfieldApi = async () => {
        const fieldData = getNewField()
        let fieldnewData: FetchField = getFetchedFields(fieldData)
        console.log(fieldnewData)
        try {
            console.log(fieldnewData)
            const data = await addField(props.formId, fieldnewData);
            console.log(data)
            dispatch({ type: "addFieldACTION", value: getNewField() })
            setNewField("")
            setNewFieldType("")
            setNewOption([])
            setNewMax(100)
            setNewMin(0)
            window.location.reload()

        } catch (error) {
            console.log(error);
        }


    }


    const removeField = async (id: number) => {
        await removeFieldApi(props.formId, id)
        dispatch({ type: "removeFieldACTION", value: state.formFields.filter(field => field.id !== id) })
    }

    const removeOption = (fieldid: number, optionid: number) => {
        dispatch({
            type: "removeOptionACTION", value: state.formFields.map((field) => {
                if (field.id === fieldid && (field.kind === "singleDropdown" || field.kind === "radio")) {
                    let newoptions = field.options.filter((option, index) => index !== optionid)
                    return { ...field, options: newoptions }
                }
                return field

            })

        })
    }

    const updateField = (value: string, id: number) => {
        dispatch({
            type: "updateFieldACTION", value: state.formFields.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        label: value,
                        placeholder: value
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }


    const updateMaxRange = (value: number, id: number) => {
        dispatch({
            type: "updateMaxACTION", value: state.formFields.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        max: value
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }

    const updateMinRange = (value: number, id: number) => {
        dispatch({
            type: "updateMinACTION", value: state.formFields.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        min: value
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }

    const addOption = () => {
        setNewOption([...newOption, ""])
    }

    const updateOption = (value: string, id: number) => {
        let updatedOption = newOption.map((option, index) => {
            if (index === id) {
                return value
            }
            return option
        })
        setNewOption(updatedOption)
    }

    const updateExOption = (value: string, id: number, fieldId: number) => {
        dispatch({
            type: "updateExOptionACTION", value: state.formFields.map((field) => {
                if (field.id === fieldId && (field.kind === "singleDropdown" || field.kind === "radio")) {
                    return ({
                        ...field,
                        options: field.options.map((option, index) => {
                            if (index === id) {
                                return value
                            }
                            return option
                        })
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }


    return (
        <div>
            <div className=" gap-2 p-4 divide-y-2 divide-dotted">
                <input aria-label='Title Name' type="text" className="w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" value={state.title} onChange={(e) => {
                    dispatch({ type: "updateTitleACTION", value: e.target.value })
                }}
                    ref={titleRef}
                />
                <div>
                    {console.log(state)}
                    {state.formFields?.map((field) => {

                        switch (field.kind) {
                            case "text":
                                return <LabeledInput formId={props.formId} id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "dropdown":
                                return <LabeledOption formId={props.formId} id={field.id} kind={field.kind} key={field.id} label={field.label} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "singleDropdown":
                                return <LabeledOption formId={props.formId} id={field.id} kind={field.kind} key={field.id} label={field.label} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "radio":
                                return <LabeledRadio formId={props.formId} id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "textarea":
                                return <LabeledInput formId={props.formId} id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "email":
                                return <LabeledInput formId={props.formId} id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "range":
                                return <LabeledRange id={field.id} max={field.max} min={field.min} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} updateMaxCB={updateMaxRange} updateMinCB={updateMinRange} />
                        }
                        return ""

                    })}
                </div>
                <div className="gap-2">
                    {/* Text */}

                    {newFieldType === "text" ? <input aria-label='New Question' type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)
                    }} /> : ""}

                    {/* DropDown */}
                    {newFieldType === "dropdown" ? <div> <h1 className='text-bold'>Question:</h1> <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)

                    }} />
                        <h1 className="text-bold">Options</h1>
                        {newOption.map((option, index) => <div key={index}>

                            <input type="text" aria-label='New Options' id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
                                // setNewOption([...newOption,e.target.value])
                                updateOption(e.target.value, Number(e.target.id))
                            }} />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => {
                                setNewOption(newOption.filter((option, i) => i !== index))
                            }} >Remove</button>
                        </div>

                        )}
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={addOption} >Add Option</button>
                    </div>
                        : ""}
                    {/*Single DropDown */}
                    {newFieldType === "singleDropdown" ? <div> <h1 className='text-bold'>Question:</h1> <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)

                    }} />
                        <h1 className="text-bold">Options</h1>
                        {newOption.map((option, index) => <div key={index}>

                            <input type="text" aria-label="Update Option" id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
                                // setNewOption([...newOption,e.target.value])
                                updateOption(e.target.value, Number(e.target.id))
                            }} />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => {
                                setNewOption(newOption.filter((option, i) => i !== index))
                            }} >Remove</button>
                        </div>

                        )}
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={addOption} >Add Option</button>
                    </div>
                        : ""}
                    {/* radio */}
                    {newFieldType === "radio" ? <div> <h1 className='text-bold'>Question:</h1> <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)

                    }} />
                        <h1 className="text-bold">Options</h1>
                        {newOption.map((option, index) => <div key={index}>

                            <input type="text" aria-label="Update Option" id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
                                // setNewOption([...newOption,e.target.value])
                                updateOption(e.target.value, Number(e.target.id))
                            }} />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={(_) => {
                                setNewOption(newOption.filter((option, i) => i !== index))
                            }} >Remove</button>
                        </div>

                        )}
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={addOption} >Add Option</button>
                    </div>
                        : ""}
                </div>

                {/* TextArea*/}

                {newFieldType === "textarea" ? <input type="text" aria-label="Update textarea Field" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} /> : ""}

                {/* Email */}

                {newFieldType === "email" ? <input type="text" aria-label="Update email Field" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} /> : ""}

                {/* Range */}

                {newFieldType === "range" ? <div> <input type="text" aria-label="Update range Field" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} />
                    <h1>Max Range</h1>

                    <input type="number" aria-label="Update max range Field" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="max range" value={newMax} onChange={(e) => {
                        setNewMax(Number(e.target.value))
                    }} />

                    <h1>Min Range</h1>

                    <input type="number" aria-label="Update min range Field" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="min range" value={newMin} onChange={(e) => {
                        setNewMin(Number(e.target.value))
                    }} />

                </div> : ""}

                <select className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 my-2" value={newFieldType} onChange={(e) => {
                    setNewFieldType(e.target.value)
                }} >
                    <option value="">Select Question type</option>
                    {Typeoptions.map((option, index) =>
                        <option key={index} value={option}>
                            {option}
                        </option>

                    )}
                </select>

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={() => {
                    addNewfieldApi()
                }} >Add Field</button>
                <div className='flex gap-4'>
                    <button onClick={(_) => {
                        saveFormData(state)
                        Store.addNotification({
                            title: "Form Saved!!!!",
                            message: `Form of id: ${props.formId} is saved`,
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
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Save</button>
                    <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'>Home</Link>
                </div>
            </div>
        </div>
    )
}


