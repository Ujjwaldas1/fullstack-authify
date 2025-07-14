import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useRef, useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function EmailVerify() {

    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, "");
        e.target.value = value;
        if (value && index < 5) {
            inputRef.current[index + 1].focus();
        }
    }


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData("text").slice(0, 6).split("");
        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });

        const next = paste.length < 6 ? paste.length : 5;
        inputRef.current[next].focus();
    }

    const handleVerify = async () => {
        const otp = inputRef.current.map((input) => input?.value).join("");

        if (otp.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/verify-otp", { otp });

            if (response.status === 200) {
                toast.success("OTP Verified successfully");
                getUserData();
                navigate("/");
            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/");
    }, [isLoggedIn, userData]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-400 relative">

            {/* Logo and Brand */}
            <div className="absolute top-4 left-5 flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <img src={assets.logo} alt="logo" width={42} height={42} style={{ filter: 'brightness(0) invert(1)' }} />
                    <span className="text-2xl font-bold text-white">Authify</span>
                </Link>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-96 max-w-full">
                <h4 className="text-center text-2xl font-bold mb-2">Email Verify OTP</h4>
                <p className="text-center text-gray-600 mb-4">
                    Enter the 6-digit code sent to your email.
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2 mb-6">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            ref={(el => (inputRef.current[i] = el))}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}

                        />
                    ))}
                </div>

                <button
                    className={`w-full py-2 text-white rounded-lg font-semibold transition ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
                    disabled={loading} onClick={handleVerify}
                >
                    {loading ? "verifying..." : "verify email"}
                </button>
            </div>
        </div>
    );
}
