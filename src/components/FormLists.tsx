import React, { useState, useEffect, useRef } from "react";
export default function FormLists(props: {
    openSelecetdFormCB: (id: number) => void,
    deleteSelectedFormCB: (id: number) => void,
    createNewFormCB: () => void,
    localForms: any
}) {
    const [formlistState, setformlistState] = useState("")

    return (
        <div>

            {/* {props.localForms.map((form) => <li key={form.id}>{form.title}
                <button onClick={() => { props.openSelecetdFormCB(form.id) }}>Open</button>
                <button onClick={() => { props.deleteSelectedFormCB(form.id) }}>Delete Form</button>
            </li>)} */}
        </div>
    )
}