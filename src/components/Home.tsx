import React from "react";
import logo from "../logo.svg"

export function Home(props: { openFormCB: () => void }) {
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex">
                <img className="h-48" src={logo} />
                <div className="flex-1 flex justify-center items-center h-48">
                    <p>Welcome to the Home Page</p>
                </div>

            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg' onClick={props.openFormCB}>open Form</button>


        </div>
    )
}