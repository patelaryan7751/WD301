import React, { useEffect, useState } from "react";
import { Link, useQueryParams } from 'raviger';
import { formData, FormItem } from "../types/form";
import { getLocalForms } from "../utils/StorageUtils";
import Modal from "./common/Modal";
import CreateForm from "./createForm";
import { deleteForm, listForms, me } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import { getCurrentUser } from "../utils/helper"

const fetchForms = async (setFormsCB: (value: FormItem[]) => void) => {
    try {
        const data: Pagination<FormItem> = await listForms({ offset: 0, limit: 20 })
        setFormsCB(data.results)
    }
    catch (error) {
        console.log(error)

    }
}

export default function Home() {
    const [{ search }, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState("")
    const [forms, setForms] = React.useState<FormItem[]>(getLocalForms());
    const [newForm, setNewForm] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>(null)
    useEffect(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    useEffect(() => {
        localStorage.setItem("savedForms", JSON.stringify(forms))
    }, [forms])
    useEffect(() => {
        fetchForms(setForms)
    }, [])
    const deleteFormApi = async (formId: number) => {
        await deleteForm(formId)
        window.location.reload()
    }
    return (

        <div>
            {currentUser?.username?.length > 0 ? (<div><div className='flex items-center justify-end'>
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

                            <Link type="button" className="mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" href={`/form/${form.id}`}>Open</Link>
                            <button type="button" className="mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { deleteFormApi(Number(form.id)) }}>Delete</button>
                            <Link type="button" className="mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" href={`/preview/${form.id}`}>Preview</Link>
                        </div>
                    </div>)
                }
                <Modal open={newForm} closeCB={() => setNewForm(false)}>
                    <CreateForm />
                </Modal></div>) : <div className="flex items-center justify-center">
                <h1>Please Login first to continue :)</h1>
            </div>}

        </div>
    )
}