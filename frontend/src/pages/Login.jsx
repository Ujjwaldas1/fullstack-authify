import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export default function Login() {
    const [isCreateAccount, setIsCreateAccount] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();
    // const backendURL = AppConstants.BACKEND_URL;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);

        try {
            if (isCreateAccount) {

                //Register API
                const response = await axios.post(`${backendURL}/register`, { name, email, password });

                if (response.status === 201) {
                    toast.success("Account Created Successfully");
                    navigate("/");
                } else {
                    toast.error("User already exists!");
                }
            } else {
                // Handle login logic

                const response = await axios.post(`${backendURL}/login`, { email, password });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    navigate("/");
                    getUserData();
                    toast.success("Login Successfully");
                } else {
                    toast.error("Email or Password Incorrect")
                }
            }
        } catch (error) {
            // console.error("Registration Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");


        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-blue-600">
            {/* Top-left Logo */}
            <div className="absolute top-4 left-5 flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <img src={assets.logo} alt="logo" width={42} height={42} style={{ filter: 'brightness(0) invert(1)' }} />
                    <span className="text-2xl font-bold text-white">Authify</span>
                </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">{isCreateAccount ? "Create Account" : "Login"}</h2>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    {isCreateAccount && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            Remember me
                        </label>
                        {!isCreateAccount && (
                            <Link to="/reset-password" className="text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        )}
                    </div>

                    {/* Enhanced Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 text-white font-semibold rounded-md transition ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Processing..." : isCreateAccount ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        {isCreateAccount ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsCreateAccount(!isCreateAccount)}
                            className="text-blue-600 hover:underline"
                        >
                            {isCreateAccount ? "Login" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
