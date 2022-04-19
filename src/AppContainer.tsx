import React from "react";
import Header from "./Header"
import { User } from "./types/userType";

export default function AppContainer(props: { currentUser: User, children: React.ReactNode }) {
    return (
        <div className="bg-gray-100">
            <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
                <Header currentUser={props.currentUser} title={"Welcome to lesson 5 of react-typescript with #tailwindcss"} />
                {props.children}
            </div>

        </div>
    )
}