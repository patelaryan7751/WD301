import { Link, navigate } from "raviger";
import React, { useState, useEffect, useRef } from "react";
import LabeledInput from "../LabeledInput";
import { formData, formField, textFieldTypes } from "../types/form"
import LabeledOption from "./LabeledOption";
import LabeledRadio from "./LabeledRadio";
import LabeledRange from "./LabeledRange";

const initialFormFields: formField[] = [
    // { kind: "dropdown", id: 1, label: "Priority", options: ["Low", "High"], value: "", placeholder: "Priority" }
];
const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const Typeoptions = ["text", "dropdown", "radio", "textarea", "email", "singleDropdown", "range"]

const initialState: (id: number) => formData = (id) => {
    console.log("start process")
    const newForm = {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
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
        saveLocalForms([...localForms, newForm])
        return newForm
    }
    return newForm
}

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

export function Form(props: { formId: number }) {
    const [state, setState] = useState({
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    // const [state, setState] = useState(() => initialState(props.formId))
    const [newField, setNewField] = useState("");
    const [newOption, setNewOption] = useState<string[]>([]);
    const [newFieldType, setNewFieldType] = useState("");
    const [newMax, setNewMax] = useState<number>(100);
    const [newMin, setNewMin] = useState<number>(0);
    const titleRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        state.id !== props.formId && navigate(`/form/${state.id}`)
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

    useEffect(() => {
        const currentForm = initialState(props.formId)
        setState(currentForm)
    }, [])

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

    const addField = () => {

        switch (newFieldType) {
            case "text":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "text",
                            id: Number(new Date()),
                            label: newField,
                            type: "text",
                            placeholder: newField,
                            value: ""
                        }
                    ]
                }
                )
                setNewField("")
                setNewFieldType("")
                break;

            case "range":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "range",
                            id: Number(new Date()),
                            label: newField,
                            type: "range",
                            value: "",
                            placeholder: newField,
                            max: newMax,
                            min: newMin
                        }
                    ]
                }
                )
                setNewField("")
                setNewFieldType("")
                break;

            case "dropdown":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "dropdown",
                            id: Number(new Date()),
                            label: newField,
                            placeholder: newField,
                            value: [],
                            options: newOption
                        }
                    ]
                }
                )
                setNewField("")
                setNewOption([])
                setNewFieldType("")
                break;

            case "singleDropdown":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "singleDropdown",
                            id: Number(new Date()),
                            label: newField,
                            placeholder: newField,
                            value: [],
                            options: newOption
                        }
                    ]
                }
                )
                setNewField("")
                setNewOption([])
                setNewFieldType("")
                break;

            case "radio":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "radio",
                            id: Number(new Date()),
                            label: newField,
                            placeholder: newField,
                            value: "",
                            options: newOption,
                            type: "radio"
                        }

                    ]
                }
                )
                setNewField("")
                setNewOption([])
                setNewFieldType("")
                break;

            case "textarea":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "textarea",
                            id: Number(new Date()),
                            label: newField,
                            type: "textarea",
                            placeholder: newField,
                            value: ""
                        }
                    ]
                }
                )
                setNewField("")
                setNewFieldType("")
                break;

            case "email":
                setState({
                    ...state,
                    formFields: [
                        ...state.formFields,
                        {
                            kind: "email",
                            id: Number(new Date()),
                            label: newField,
                            type: "email",
                            placeholder: newField,
                            value: ""
                        }
                    ]
                }
                )
                setNewField("")
                setNewFieldType("")
                break;
        }

    }


    const removeField = (id: number) => {
        setState({
            ...state,

            formFields: state.formFields.filter(field => field.id !== id)
        })
    }

    const removeOption = (fieldid: number, optionid: number) => {
        setState({
            ...state,

            formFields: state.formFields.map((field) => {
                if (field.id === fieldid && (field.kind === "dropdown" || field.kind === "radio")) {
                    let newoptions = field.options.filter((option, index) => index !== optionid)
                    return { ...field, options: newoptions }
                }
                return field

            })
        })
    }

    const updateField = (value: string, id: number) => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
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
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
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
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
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
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                if (field.id === fieldId && field.kind === "dropdown") {
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
                <input type="text" className="w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" value={state.title} onChange={(e) => {
                    setState({
                        ...state,
                        title: e.target.value,
                    })
                }}
                    ref={titleRef}
                />
                <div>
                    {state.formFields.map((field) => {
                        switch (field.kind) {
                            case "text":
                                return <LabeledInput id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "dropdown":
                                return <LabeledOption id={field.id} kind={field.kind} key={field.id} label={field.label} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "singleDropdown":
                                return <LabeledOption id={field.id} kind={field.kind} key={field.id} label={field.label} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "radio":
                                return <LabeledRadio id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} value={field.value} options={field.options} updateOptionCB={updateExOption} updateQuestionCB={updateField} removeFieldCB={removeField} removeOptionCB={removeOption} />
                            case "textarea":
                                return <LabeledInput id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "email":
                                return <LabeledInput id={field.id} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} />
                            case "range":
                                return <LabeledRange id={field.id} max={field.max} min={field.min} key={field.id} label={field.label} placeholder={field.placeholder} type={field.type} removeFieldCB={removeField} updateFieldCB={updateField} value={field.value} updateMaxCB={updateMaxRange} updateMinCB={updateMinRange} />

                        }

                    })}
                </div>
                <div className="gap-2">
                    {/* Text */}

                    {newFieldType === "text" ? <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)
                    }} /> : ""}

                    {/* DropDown */}
                    {newFieldType === "dropdown" ? <div> <h1 className='text-bold'>Question:</h1> <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                        setNewField(e.target.value)

                    }} />
                        <h1 className="text-bold">Options</h1>
                        {newOption.map((option, index) => <div key={index}>

                            <input type="text" id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
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

                            <input type="text" id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
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

                            <input type="text" id={`${index}`} className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="option" value={option} onChange={(e) => {
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

                {newFieldType === "textarea" ? <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} /> : ""}

                {/* Email */}

                {newFieldType === "email" ? <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} /> : ""}

                {/* Range */}

                {newFieldType === "range" ? <div> <input type="text" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="new question" value={newField} onChange={(e) => {
                    setNewField(e.target.value)
                }} />
                    <h1>Max Range</h1>

                    <input type="number" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="max range" value={newMax} onChange={(e) => {
                        setNewMax(Number(e.target.value))
                    }} />

                    <h1>Min Range</h1>

                    <input type="number" className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1" placeholder="min range" value={newMin} onChange={(e) => {
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

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={addField} >Add Field</button>
                <div className='flex gap-4'>
                    <button onClick={(_) => {
                        saveFormData(state)
                    }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' >Save</button>
                    <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'>Home</Link>
                </div>
            </div>
        </div>
    )
}