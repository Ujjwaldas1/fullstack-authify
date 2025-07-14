import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify";
import axios from "axios";

export default function Mneubar() {
    const navigate = useNavigate();
    const { userData, backendURL, setUserData, setIsLoggedIn } = useContext(AppContext);
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownOpen && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/logout");
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");

        }
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL + "/send-otp");
            if (response.status === 200) {
                navigate("/email-verify");
                toast.success("OTP has been sent successfully.");

            } else {
                toast.error("Unable to send OTP")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");

        }
    }

    return (


        <nav className="bg-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img src={assets.logo} alt="Authify Logo" width={42} height={42} />
                <span className="text-2xl font-bold text-gray-900">Authify</span>
            </div>

            {userData ? (
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="bg-gray-800 text-white rounded-full flex items-center justify-center w-10 h-10 cursor-pointer select-none"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        {userData.name[0].toUpperCase()}
                    </div>

                    {dropDownOpen && (
                        <div className="absolute right-0 top-12 z-50 bg-white shadow-md rounded-md p-2 w-40">
                            {!userData.isAccountVerified && (
                                <div
                                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    onClick={sendVerificationOtp}
                                >
                                    Verify Email
                                </div>
                            )}
                            <div
                                className="px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}

                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    className="px-3 py-1 border border-black text-black rounded-md hover:text-white hover:bg-black transition"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            )}



        </nav>
    );
}
