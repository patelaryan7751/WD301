import { navigate } from "raviger";
import React, { useState } from "react";
import { Errors, FormItem, validateForm } from "../types/form"
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
    const [form, setForm] = useState<FormItem>({
        title: "",
        description: "",
        is_public: false,
    })
    const [errors, setErrors] = useState<Errors<FormItem>>({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateForm(form)
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const data = await createForm(form)
                navigate(`/forms/${data.id}`)
            }
            catch (error) {
                console.log(error)
            }


        }
    }

    return (
        <div className="w-full max-w-lg divide-y divide-gray-200">
            <h1 className="text-2xl my-2 text-gray-700">Create Form</h1>
            <form className="py-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className={`${errors.title ? "text-red-500" : ""}`}>
                        Title
                    </label>
                    <input className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
                        type="text"
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={(e) => {
                            setForm({ ...form, title: e.target.value })
                        }} />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description"
                        className={`${errors.description ? "text-red-500" : ""}`}
                    >
                        Description
                    </label>
                    <input className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
                        type="text"
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={(e) => {
                            setForm({ ...form, description: e.target.value })
                        }}
                    />
                    {errors.description && (
                        <p className="text-red-500">{errors.description}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input className="mr-2 border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
                        type="checkbox"
                        name="is_public"
                        id="is_public"
                        value={form.is_public ? "true" : "false"}
                        onChange={(e) => {
                            setForm({ ...form, is_public: e.target.checked })
                        }}
                    />
                    <label htmlFor="is_public" className={`${errors.is_public ? "text-red-500" : ""}`}>
                        Is Public
                    </label>
                    {errors.is_public && (<p className="text-red-500">{errors.is_public}</p>)}
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >Submit</button>
            </form>
        </div>
    )
}
