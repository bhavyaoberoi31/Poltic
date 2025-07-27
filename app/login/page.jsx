'use client';

import Image from "next/image";
import { ArrowRight, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { googleLogin, signIn } from "../services/api.service";
import { useRedirectIfAuthenticated } from "../lib/redirection";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {

  useRedirectIfAuthenticated();
  const router = useRouter();
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
      const res = await signIn({ email, password });
      if(res.tokenExpiry) {
        localStorage.setItem('tokenExpiry', String(res.tokenExpiry));
        router.push("/home");
      }


    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const token = credentialResponse.credential;
      const res = await googleLogin({ token });
      console.log(res);
      
      if(res.tokenExpiry) {
        localStorage.setItem('tokenExpiry', res.tokenExpiry);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      
      setErrorMessage(error?.response?.data?.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Google login was unsuccessful. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>

    
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar image */}
      <div className="hidden md:flex md:w-[40%] max-h-screen">
        <Image
          src="/assets/loginimg.png"
          alt="Login Visual"
          width={500}
          height={700}
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex justify-center items-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <Image
            onClick={() => router.push('/')}
            src="/assets/logo.png"
            alt="Logo"
            width={140}
            height={40}
            className="cursor-pointer mx-auto mb-6"
          />

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to your Poltic account
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 whitespace-pre-line text-sm bg-red-50 p-2 rounded-md">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => router.push("/forget-password")}
              >
                Forgot password?
              </button>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={16} />
            </button>

            
            <div className="mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
           

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                className="text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="flex justify-center items-center gap-1 text-sm text-gray-500 mt-6">
            <button className="hover:underline">Terms and Conditions</button>
            <Dot className="w-4 h-4" />
            <button className="hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
