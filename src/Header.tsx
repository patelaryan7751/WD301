import { ActiveLink } from "raviger";
import React from "react";
import logo from './logo.svg';
import { User } from "./types/userType";

export default function Header(props: { title: string, currentUser: User }) {
    return (
        <div className="flex gap-2 items-center">
            <img src={logo} className="animate-spin h-16 w-16" alt="logo" />
            <div className="flex gap-2 items-center">
                {[
                    { page: "Home", url: "/" },
                    { page: "About", url: "/about" },
                    ...(
                        props.currentUser?.username?.length > 0 ? [{
                            page: "Logout", onClick: () => {
                                localStorage.removeItem("token")
                                window.location.reload()
                            }
                        }] : [{ page: "Login", url: "/login" }]
                    ),
                ].map((link) => (
                    link.url ? (
                        <ActiveLink key={link.page}
                            href={link.url}
                            className="text-gray-800 p-2 m-2 uppercase"
                            exactActiveClass="text-blue-600">{link.page}</ActiveLink>
                    ) : <button key={link.page}
                        onClick={link.onClick}
                        className="text-gray-800 p-2 m-2 uppercase">{link.page}</button>
                ))}
            </div>


        </div>
    )
}
