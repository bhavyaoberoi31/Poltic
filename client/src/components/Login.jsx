import img from "../assets/image1.png";
import img1 from "../assets/Picture1.png";
import { FaArrowRight } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../features/auth/authThunk";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { setUser } from "../features/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error: loginError } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Both email and password are required.");
            return;
        }

        try {
            setLoading(true);
            await dispatch(login({ email, password })).unwrap();
            navigate("/home");
        } catch (error) {
            setErrorMessage(error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/v1/users/auth/google`,
                { token },
                { withCredentials: true }
            );
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/v1/users/current`, { withCredentials: true });
            dispatch(setUser(data));
            
            navigate('/home');
        } catch (error) {
            setErrorMessage("Google login failed.");
        }
    };

    const handleGoogleError = () => {
        setErrorMessage("Google login was unsuccessful. Please try again.");
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between max-h-screen">
            <img
                onClick={() => navigate("/")}
                src={img1}
                alt="Logo"
                className="h-[30px] sm:h-[40px] w-fit m-4 cursor-pointer"
            />
            <div className="md:w-[50%] w-full h-screen md:mx-auto px-5 md:p-0">
                <div className="flex flex-col md:justify-center md:items-center h-[calc(100vh-84px)]">
                    <form className="flex flex-col max-h-screen my-auto" onSubmit={handleLogin}>
                        <div>
                            <p className="font-medium text-[20px]">Sign in</p>
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="md:w-72 px-3 py-2 border border-1 my-4 border-[#0000003B] rounded-sm"
                        />
                        <input
                            type="password"
                            placeholder="Password *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="md:w-72 px-3 py-2 border border-1 border-[#0000003B] rounded-sm"
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                        )}
                        <div className="flex justify-between my-5">
                            <button
                                className="px-4 py-2 bg-[#065FD4] text-white rounded-sm flex gap-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "LOGIN"}
                                <FaArrowRight className="m-1" />
                            </button>
                            <button
                                className="text-[14px] font-semibold"
                                onClick={() => navigate("/forget-password")}
                                type="button"
                            >
                                Forgot your password?
                            </button>
                        </div>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                        />
                        <div className="mt-4">
                            <button
                                className="px-4 py-3 bg-black text-white rounded-sm w-full uppercase"
                                onClick={() => navigate("/signup")}
                                type="button"
                            >
                                Create new Account
                            </button>
                        </div>
                    </form>
                    <div className="flex text-[#000000DE] mt-4">
                        <button className="text-[14px]">Terms and conditions</button>
                        <LuDot className="m-1" />
                        <button className="text-[14px]">Privacy policy</button>
                    </div>
                </div>
            </div>
            <div className="md:w-[40%] hidden md:flex">
                <img
                    src={img}
                    alt="Login Visual"
                    className="h-screen w-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;
