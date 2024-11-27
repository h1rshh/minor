'use client'
import { useEffect, useState } from 'react';
import "../globals.css";

// Binary Search implementation to filter projects based on price range
const binarySearch = (projects, target, key) => {
  let left = 0;
  let right = projects.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (projects[mid][key] === target) {
      return mid;
    } else if (projects[mid][key] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // If the element is not found
};

const filterProjectsByPrice = (projects, minPrice, maxPrice) => {
  // Sort the projects by price in ascending order
  const sortedProjects = projects.sort((a, b) => a.budget - b.budget);

  // Filter the projects that fall between the minPrice and maxPrice
  const filteredProjects = sortedProjects.filter(project => {
    return project.budget >= minPrice && project.budget <= maxPrice;
  });

  return filteredProjects;
};

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState('0-5000'); // Default price range
  const [filterApplied, setFilterApplied] = useState(false); // Track whether a filter is applied

  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/get-projects');
        const data = await response.json();
        
        // Reverse the order of projects to show the newest first
        setProjects(prevProjects => [...data.reverse(), ...prevProjects]);

      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  if (loading) return <div className="text-white">Loading...</div>;

  // Define price ranges based on predefined ranges
  const priceRanges = {
    '0-5000': { min: 0, max: 5000 },
    '5000-10000': { min: 5000, max: 10000 },
    '10000-20000': { min: 10000, max: 20000 },
    '20000-50000': { min: 20000, max: 50000 },
    '50000+': { min: 50000, max: Infinity }
  };

  // Get the selected price range based on the dropdown selection
  const { min, max } = priceRanges[priceRange];

  // If a filter is applied, filter the projects based on price range
  const filteredProjects = filterApplied 
    ? filterProjectsByPrice(projects, min, max)
    : projects; // Show all projects if no filter is applied

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white relative p-20">
      {/* EzHire Logo */}
      <div className="absolute top-4 left-4">
        <a href="/Home" className="text-3xl font-bold text-indigo-500 hover:text-indigo-300 transition duration-300">
          EzHire
        </a>
      </div>
      <h1 className="text-3xl font-semibold text-center mb-8">Worker Dashboard</h1>


      {/* Worker Profile Card */}
      <div className="p-6 max-w-7xl mx-auto mt-16">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex items-center space-x-6">
          <img 
            src="https://media.istockphoto.com/id/1145081913/photo/indian-man-portrait-outdoors.jpg?s=612x612&w=0&k=20&c=nmzJcrOYfRZUrE8RiGHRv4XGryknh3o0NNzwQZ04tt0="
            alt="Worker Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex flex-col text-left text-gray-300">
            <h3 className="text-2xl font-semibold">{'Shayam'}</h3>
            <p className="text-lg">{'Expertise: Worker'}</p>
            <p className="text-yellow-500">{'⭐'.repeat(4)}</p>
            <p className="text-sm">Completed Projects: 7</p>
            <p className="text-sm">Price: ₹700/project</p>
            <p className="text-sm">Address: Panditwari</p>
          </div>
        </div>
      </div>

      {/* Worker Dashboard Content */}
      <div className="p-6 max-w-7xl mx-auto mt-16">
        {/* Price Range Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold">Filter by Price Range</h3>
          <div className="mt-2">
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                setFilterApplied(true); // Apply filter when price range is selected
              }}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="0-5000">₹0 - ₹5000</option>
              <option value="5000-10000">₹5000 - ₹10000</option>
              <option value="10000-20000">₹10000 - ₹20000</option>
              <option value="20000-50000">₹20000 - ₹50000</option>
              <option value="50000+">₹50000+</option>
            </select>
          </div>
        </div>

        {/* Display Projects */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-300">No projects available within the selected price range</p>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-700 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-xl font-semibold text-indigo-500">{project.title}</h2>
                <p className="text-gray-300 mt-2">Location: {project.location}</p>
                <p className="text-gray-300">Budget: ₹{project.budget}</p>
                <p className="text-gray-300">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>

                {/* Action Button - Positioning it back to bottom left */}
                <div className="mt-4 flex justify-start">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
