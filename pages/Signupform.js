import React, { useState } from 'react';
import "../globals.css";
import { useRouter } from 'next/router';  // To handle redirection after signup

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);  // Optional: loading state
  const router = useRouter();  // Next.js Router to redirect after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Optional: start loading when submitting

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, userType }),
    });

    const data = await response.json();

    if (response.ok) {
      // Sign up successful: Store JWT token in localStorage (or sessionStorage)
      localStorage.setItem('token', data.token);  // Store token
      alert("Sign up successful!");

      // Redirect to login page or home
      router.push('/Loginform');  // You can change this to any page after signup
    } else {
      // Sign up failed: Display error message
      alert("Sign up failed: " + data.error);
    }

    setLoading(false);  // Optional: stop loading after the submission is done
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up for EzHire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="userType">
              I am a:
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select user type</option>
              <option value="client">Client</option>
              <option value="worker">Construction Worker</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}  // Optional: disable button during loading
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/Loginform" className="text-blue-400 hover:text-blue-500 cursor-pointer">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
