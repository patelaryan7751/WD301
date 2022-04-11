import { stringify } from 'querystring';
import React, { useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { optionanswer } from '../types/preview';


export default function PreviewLabeledOptions(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateOptionAnsCB: (value: optionanswer[], id: number) => void, value: string | string[] }) {
    const [selected, setSelected] = useState<optionanswer[]>([])

    const choices = props.options.map((option) => {
        return { label: option, value: option }
    })

    return (
        <div className="gap-2">
            <label className="text-xl">{props.label}</label>
            <MultiSelect
                options={choices}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={() => {
                console.log(selected[0].value)
                props.updateOptionAnsCB(selected, props.id)
            }} >Save Selection</button>
        </div>
    )
}


