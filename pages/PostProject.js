'use client'
import "../globals.css"
import React, { useState } from 'react';

const PostProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    location: '',
    deadline: '',
  });

  const [message, setMessage] = useState("");  // For displaying success/error message
  const [loading, setLoading] = useState(false);  // For handling loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // Set loading state to true while the request is being processed
    try {
      const response = await fetch('/api/post-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Check if response is OK before attempting to parse it
      if (!response.ok) {
        const errorData = await response.text(); // Get the error message as text
        setMessage(`Error: ${errorData}`);
        setLoading(false);  // Reset loading state
        return;
      }

      // Parse JSON if response is successful
      const data = await response.json();
      setMessage("Project posted successfully!");
      setFormData({ title: '', budget: '', location: '', deadline: '' }); // Reset form
      setLoading(false);  // Reset loading state

      // Clear the success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error("Error submitting project:", error);
      setMessage("An error occurred. Please try again.");
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center p-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-500">Post a Project</h1>

        {/* Display success/error message */}
        {message && (
          <div className={`text-center mb-4 ${message.includes("Error") ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}

        {/* Show loading state while waiting for the response */}
        {loading ? (
          <div className="text-center mb-4 text-gray-500">Posting project...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-300">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-lg font-medium text-gray-300">
                Budget (₹)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-lg font-medium text-gray-300">
                Location (Where will the work take place?)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-lg font-medium text-gray-300">
                Deadline (Project Completion Date)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Post Project
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostProject;
