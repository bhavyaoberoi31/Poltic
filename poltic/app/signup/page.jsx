'use client';

import Image from 'next/image';
import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { signUp } from '../services/api.service';

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    let errors = '';
    if (!firstName.trim()) errors += 'First Name is required.\n';
    if (!lastName.trim()) errors += 'Last Name is required.\n';
    if (!email.includes('@')) errors += 'Enter a valid email address.\n';
    if (password !== confPassword) errors += 'Passwords do not match.\n';

    if (errors) {
      setLoading(false);
      setErrorMessage(errors);
      return;
    }

    setErrorMessage('');

    try {
      await signUp({
        firstName,
        lastName,
        email,
        password,
      });

      // router.push('/email-confirmation');
      router.push('/login');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar image */}
      <div className="hidden md:flex md:w-[40%] max-h-screen">
        <Image
          src="/assets/image2.png"
          alt="Signup Visual"
          width={600}
          height={800}
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>

      {/* Signup Form */}
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
            Join Poltic
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Create your account to get started
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 whitespace-pre-line text-sm bg-red-50 p-2 rounded-md">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:text-blue-500 font-medium"
                onClick={() => router.push('/login')}
              >
                Sign in
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
  );
};

export default Signup;
