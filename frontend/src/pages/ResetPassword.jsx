import { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const { backendURL, isLoggedIn, userData, getUserData } = useContext(AppContext);
    axios.defaults.withCredentials = true;

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '');
        e.target.value = value;
        if (value && index < 5) inputRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').slice(0, 6).split('');
        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });
        const next = paste.length < 6 ? paste.length : 5;
        inputRef.current[next]?.focus();
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/send-reset-otp?email=" + email);

            if (response.status === 200) {
                toast.success("OTP sent to your email.");
                setIsEmailSent(true);
            } else {
                toast.error("Failed to send OTP.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while sending OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        const otpValue = inputRef.current.map((input) => input?.value).join('');

        if (otpValue.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP.");
            return;
        }

        setOtp(otpValue);
        setIsOtpVerified(true);
    };



    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendURL + "/reset-password", {
                email,
                otp,
                newPassword,
            });

            if (response.status === 200) {
                toast.success("Password reset successfully");
                navigate("/login");
            } else {
                toast.error("Failed to reset password");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while resetting the password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-indigo-500 relative">
            <Link to="/" className="absolute top-4 left-4 flex items-center space-x-2">
                <img src={assets.logo} alt="logo" width={32} height={32} style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-white text-xl font-semibold">Authify</span>
            </Link>

            {/* Step 1: Enter Email */}
            {!isEmailSent && (
                <div className="bg-white p-6 rounded-2xl shadow-md text-center w-full max-w-md">
                    <h4 className="text-2xl font-bold mb-2">Reset Password</h4>
                    <p className="mb-4 text-gray-600">Enter your registered email address</p>
                    <form onSubmit={handleEmailSubmit}>
                        <div className="flex items-center mb-4 bg-gray-100 rounded-full px-4 py-2">
                            <i className="bi bi-envelope text-gray-500 mr-2" />
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="flex-1 bg-transparent border-none outline-none text-gray-700"
                                style={{ height: '25px' }}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" disabled={loading}>
                            {loading ? "Sending..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            {/* Step 2: OTP Verification */}
            {isEmailSent && !isOtpVerified && (
                <div className="bg-white p-6 rounded-2xl shadow-md text-center w-full max-w-md">
                    <h4 className="text-2xl font-bold mb-2">Verify OTP</h4>
                    <p className="mb-4 text-gray-600">Enter the 6-digit code sent to your email.</p>
                    <div className="flex justify-center gap-2 mb-4">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-indigo-500"
                                ref={(el) => (inputRef.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>
                    <button
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        disabled={loading}
                        onClick={handleVerify}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>
            )}

            {/* Step 3: Reset Password */}
            {isOtpVerified && (
                <div className="bg-white p-6 rounded-2xl shadow-md text-center w-full max-w-md">
                    <h4 className="text-2xl font-bold mb-2">Set New Password</h4>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </div>
            )}
        </div>
    );
}
