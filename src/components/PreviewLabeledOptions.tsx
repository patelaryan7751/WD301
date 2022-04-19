import React, { useState } from 'react';
import { optionanswer } from '../types/preview';
import Multiselect from './Multiselect'


export default function PreviewLabeledOptions(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateOptionAnsCB: (value: optionanswer[], id: number) => void, value: string | string[] }) {
    const [selected, setSelected] = useState<optionanswer[]>([])
    const updateAnsState = (state: string[]) => {
        console.log(state)
        setSelected(state.map((option) => {
            return { label: option, value: option }
        }))
    }
    return (
        <div className="gap-2">

            <label htmlFor={`${props.label}`} className="text-xl">{props.label}</label>
            <Multiselect choices={props.options} updateAnsStateCB={updateAnsState} />

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={() => {
                console.log(selected)
                props.updateOptionAnsCB(selected, props.id)
            }} >Save Selection</button>
            <h1>{props.value ? <div>Selected Answer: <span>{props.value + " "}</span></div> : ""}</h1>
        </div>
    )
}


