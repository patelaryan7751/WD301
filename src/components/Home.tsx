import React, { useEffect, useState } from "react";
import { Link, useQueryParams } from 'raviger';
import { formData, FormItem } from "../types/form";
import { getLocalForms } from "../utils/StorageUtils";
import Modal from "./common/Modal";
import CreateForm from "./createForm";

// const fetchForms = (setFormsCB: (value: FormItem[]) => void) => {
//     fetch('https://tsapi.coronasafe.live/api/mock_test/').
//         then(response => response.json())
//         .then((data) => setFormsCB(data))
// }

const fetchForms = async (setFormsCB: (value: FormItem[]) => void) => {
    const response = await fetch('https://tsapi.coronasafe.live/api/mock_test/')
    const jsonData = await response.json()
    setFormsCB(jsonData)
}

export default function Home() {
    const [{ search }, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState("")
    const [forms, setForms] = React.useState<FormItem[]>(getLocalForms());
    const [newForm, setNewForm] = useState(false)
    useEffect(() => {
        localStorage.setItem("savedForms", JSON.stringify(forms))
    }, [forms])
    useEffect(() => {
        fetchForms(setForms)
    }, [])
    return (
        <div>
            <div className='flex items-center justify-end'>
                {/* <Link href={'/form/0'} className='bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold px-4 m-2 rounded-lg'>
                    <div className="flex flex-col py-2">
                        <h1 className="text-xl text-slate-700">+ New Form</h1>
                        <span className="text-gray-600"></span>
                    </div>
                </Link> */}
                <button onClick={_ => { setNewForm(true) }} className='bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold px-4 m-2 rounded-lg'>
                    <div className="flex flex-col py-2">
                        <h1 className="text-xl text-slate-700">+ New Form</h1>
                        <span className="text-gray-600"></span>
                    </div>
                </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                setQuery({ search: searchString })
            }}>
                <label>
                    Search
                </label>
                <input name="search" value={searchString} onChange={(e) => {
                    setSearchString(e.target.value)
                }}
                    type="text"
                    className='w-full border-2 border-gray-200 rounded-lg p-2 m-2 flex-1' />
            </form>

            {forms.filter((form) => form.title.toLowerCase().includes(search?.toLowerCase() || "")).map((form) =>
                <div key={form.id} className="flex justify-center my-2">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{form.title} </h5>
                        {/* <p className="text-gray-700 text-base mb-4">
                            This form contains {form.formFields.length} questions to answer.
                        </p> */}

                        <p className="text-gray-700 text-base mb-4">
                            {/* This form contains {form.formFields.length} questions to answer. */}
                        </p>
                    </div>
                </div>)
            }
            <Modal open={newForm} closeCB={() => setNewForm(false)}>
                <CreateForm />
            </Modal>
        </div>
    )
}