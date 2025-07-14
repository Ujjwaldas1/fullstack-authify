import { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

export default function Header() {

    const { userData } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10">
            <img
                src={assets.header}
                alt="header"
                width={120}
                className="mb-6"
            />
            <h5 className="text-lg font-semibold mb-2">


                Hey {userData ? userData.name : 'Devloper'} <span role="img" aria-label="wave">👋</span>
            </h5>
            <h1 className="text-5xl font-bold mb-4">
                Welcome to our product
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-md">
                Let's start with a quick product tour and you can set up the authentication in no time!
            </p>
            <button className="px-6 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition">
                Get Started
            </button>
        </div>
    );
}
