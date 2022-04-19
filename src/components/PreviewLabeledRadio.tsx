
export default function PreviewLabeledRadio(props: { kind: string, options: string[], qnum: number, id: number, label: string, type: string, placeholder: string, updateRadioAnsCB: (value: string, id: number) => void, value: string | string[] }) {

    return (
        <div>

            <h1 className='text-xl'>{props.label}</h1>
            <br />
            <div>
                {props.options.map((option, index) => <div className="form-check" key={`${props.id}option${index}`}>
                    <input aria-label="radio option input" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" onChange={(e) => {
                        console.log("up")
                        props.updateRadioAnsCB(e.target.value, props.qnum)
                    }} type="radio" name={props.label} value={option} id={`${props.id}option${index}`} />
                    <label htmlFor={`${props.label}`} className="form-check-label inline-block text-gray-800">
                        {option}
                    </label>
                </div>)}
                <br />
                <h1>{props.value ? <div>Selected Answer: {props.value}</div> : ""}</h1>

            </div>
        </div>
    )
}


