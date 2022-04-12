import React, { useState } from 'react';

export default function PreviewLabeledSingleOptions(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateSingleOptionAnsCB: (value: string, id: number) => void, value: string | string[] }) {
    const [selected, setSelected] = useState("")
    return (
        <div className="gap-2">
            <h1>{props.value ? <div>Selected Answer:{props.value}</div> : ""}</h1>
            <label className="text-xl">{props.label}</label>
            <select className="border-2 border-gray-200 rounded-lg p-2 m-2 flex-1 my-2" value={selected} onChange={(e) => {
                setSelected(e.target.value)
            }} >
                {props.options.map((option, index) =>
                    <option key={index} value={option}>
                        {option}
                    </option>

                )}
            </select>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={() => {
                console.log(selected)
                props.updateSingleOptionAnsCB(selected, props.id)
            }} >Save Selection</button>
        </div>
    )
}