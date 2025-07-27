'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Dot } from 'lucide-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add email validation and backend logic here
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Image Section */}
      <div className="hidden md:flex md:w-[40%]">
        <Image
          src="/assets/loginimg.png"
          alt="Forgot Password Visual"
          width={600}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Reset your password
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Enter your registered email to receive the reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              NEXT <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={() => router.push('/login')}
            className="w-full mt-4 py-2 bg-gray-800 text-white uppercase text-sm rounded-md hover:bg-gray-900 transition"
          >
            Back to Login
          </button>
        </div>

        {/* Terms & Privacy */}
        <div className="flex justify-center items-center gap-1 text-sm text-gray-500 mt-6">
          <button className="hover:underline">Terms and Conditions</button>
          <Dot className="w-4 h-4" />
          <button className="hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
