'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import "../globals.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Hook for routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request

    // Sending the POST request
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false); // Set loading to false when request finishes

    // Log the status and raw text of the response for debugging
    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response text:', text);

    // Check if the response is successful (status code 200-299)
    if (response.ok) {
      // Try parsing the response as JSON
      let data;
      try {
        data = JSON.parse(text);  // Parse as JSON if response is okay
        console.log('Parsed data:', data);  // Log the parsed data for debugging
      } catch (error) {
        // If JSON parsing fails, handle it
        console.error('Error parsing response:', error);
        setErrorMessage('Error parsing server response');
        return;
      }

      // If login is successful, store the token and role
      alert('Login successful!');
      localStorage.setItem('token', data.token);  // Store the JWT token
      localStorage.setItem('role', data.role);    // Store the user's role

      // Redirect to the dashboard based on the role
      if (data.role === 'client') {
        router.push('/client-dashboard');  // Redirect to client dashboard
      } else if (data.role === 'worker') {
        router.push('/worker-dashboard');  // Redirect to worker dashboard
      }
    } else {
      // If response is not ok (not successful), display error message
      setErrorMessage('Invalid credentials or server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login to EzHire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>} {/* Display error message */}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white hover:bg-blue-700 transition duration-300`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/Signupform" className="text-blue-400 hover:text-blue-500 cursor-pointer">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
