'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import "../globals.css"

const ClientDashboard = () => {
  const router = useRouter();
  const [workers, setWorkers] = useState([]);
  const [sortOption, setSortOption] = useState(""); // New state for sorting

  useEffect(() => {
    // Simulating fetching workers data
    setWorkers([
      {
        id: 1,
        name: 'Deepak',
        rating: 2.0,
        price: 600,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://i.timesnowhindi.com/stories/MAJDOOR-AP_0.jpg',
        address: 'Prem-Nagar',
        completedProjects: 12,
      },
      {
        id: 2,
        name: 'Iqbal',
        rating: 3.0,
        price: 400,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://images.unsplash.com/photo-1598434191525-57daac51a2ca?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: 'Vikas-Nagr',
        completedProjects: 2,
      },
      {
        id: 3,
        name: 'Shayam',
        rating: 4.0,
        price: 700,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://media.istockphoto.com/id/1145081913/photo/indian-man-portrait-outdoors.jpg?s=612x612&w=0&k=20&c=nmzJcrOYfRZUrE8RiGHRv4XGryknh3o0NNzwQZ04tt0=',
        address: 'Panditwari',
        completedProjects: 7,
      },
      {
        id: 4,
        name: 'Azhar',
        rating: 5.0,
        price: 500,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://images.pond5.com/poor-indian-young-boy-selling-footage-085754102_iconl.jpeg',
        address: 'Bhauwala',
        completedProjects: 3,
      },
      {
        id: 5,
        name: 'Vinod',
        rating: 2.0,
        price: 400,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://media.istockphoto.com/id/2127751798/photo/senior-worker-in-construction-building-site.jpg?s=612x612&w=0&k=20&c=zuNUVlKcmbKRIGRWWpfslGg12xs4aFeQ2EyPEuqmapc=',
        address: 'Bidholi',
        completedProjects: 2,
      },
      {
        id: 6,
        name: 'Prakash',
        rating: 1.0,
        price: 600,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://img.freepik.com/premium-photo/young-indian-poor-man-standing-nature-background_75648-3206.jpg',
        address: 'Manduwala',
        completedProjects: 1,
      },
      {
        id: 7,
        name: 'Danish',
        rating: 5.0,
        price: 800,
        role: 'Worker',
        expertise: 'Worker',
        picture: 'https://media.istockphoto.com/id/1319465272/photo/latin-american-farmer-working-at-an-agricultural-farm.jpg?s=612x612&w=0&k=20&c=Hon3srIE1AKo835tHBlanBw2UPa2_eHr3Hy0CbFJBzo=',
        address: 'Selaqui',
        completedProjects: 9,
      },
      // Add more workers here with similar picture URLs
    ]);
  }, []);

  // Quick Sort Implementation
  const quickSort = (array, left = 0, right = array.length - 1, key) => {
    if (left < right) {
      const pivotIndex = partition(array, left, right, key);
      quickSort(array, left, pivotIndex - 1, key);
      quickSort(array, pivotIndex + 1, right, key);
    }
  };

  const partition = (array, left, right, key) => {
    const pivotValue = array[right][key];
    let pivotIndex = left;

    for (let i = left; i < right; i++) {
      if ((key === "price" && array[i][key] < pivotValue) || 
          (key === "rating" && array[i][key] > pivotValue)) { // Adjust comparison based on the sort option
        [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
        pivotIndex++;
      }
    }

    [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
    return pivotIndex;
  };

  // Sort Handler based on selected option
  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedWorkers = [...workers];
    if (option === "price") {
      quickSort(sortedWorkers, 0, sortedWorkers.length - 1, "price");
    } else if (option === "rating") {
      quickSort(sortedWorkers, 0, sortedWorkers.length - 1, "rating");
    }
    setWorkers(sortedWorkers); // Update state to re-render with sorted list
  };

  const handleLogout = () => {
    router.push('/Home');
  };

  const handlePostProject = () => {
    router.push('/PostProject');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white relative m-0 mt-0 pt-20">
      {/* EzHire Logo */}
      <div className="absolute top-4 left-4">
        <a href="/Home" className="text-3xl font-bold text-indigo-500 hover:text-indigo-300 transition duration-300">
          EzHire
        </a>
      </div>

      {/* Settings, Post Project, and Logout Buttons */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          className="text-3xl font-bolder text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={() => alert('Settings')}>
          <IoSettingsOutline />
        </button>
        <button
          className="text-3xl font-extrabold text-gray-400 hover:text-gray-200 transition duration-300 text-2xl"
          onClick={handleLogout}>
          <MdLogout />
        </button>
        <button
          onClick={handlePostProject}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Post Project
        </button>
      </div>

      {/* Worker Profiles */}
      <div className="p-6 max-w-7xl mx-auto mt-16">
        <h1 className="text-3xl font-semibold text-center mb-8">Available Workers</h1>
        
        {/* Filter Dropdown for Sorting */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-gray-300">Sort By:</label>
          <select
            value={sortOption}
            onChange={handleSort}
            className="p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
          >
            <option value="">Select</option>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>

        {/* Worker Cards */}
        <div className="grid grid-cols-1 gap-8">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-gray-700 shadow-lg rounded-lg p-6 flex items-center space-x-6">
              <img
                src={worker.picture}
                alt={worker.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium">{worker.name}</h3>
                <p className="text-gray-300">{worker.expertise}</p>
                <p className="text-yellow-500">{'⭐'.repeat(Math.floor(worker.rating))}</p>
                <p className="text-gray-400">Completed Projects: {worker.completedProjects}</p> {/* Display completed projects */}
                <p className="text-gray-400">Price: ₹{worker.price}/project</p>
                <p className="text-gray-400">Address: {worker.address}</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition duration-300">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
