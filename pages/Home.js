'use client';
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const EzHire = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white overflow-hidden">
      {/* Header with Login and Signup buttons */}
      <header className="relative flex justify-between items-center p-6 backdrop-filter-blur-lg bg-[#5e60652d]">
        <h1 className="text-3xl font-bold">EzHire</h1>
        <div className="absolute top-6 right-6 space-x-4">
          <Link href="/Loginform">
            <button className="login-signup-btn bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
              Login
            </button>
          </Link>
          <Link href="/Signupform">
            <button className="login-signup-btn bg-purple-700 py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">
              Signup
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6 relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/2048246/2048246-hd_1920_1080_24fps.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
        />
        <div className="relative z-10">
          <h1 className="heading text-4xl md:text-5xl font-bold mb-6">Welcome to EzHire</h1>
          <p className="text-lg mb-8">
            Connecting workers and homeowners for a seamless construction experience.
          </p>
          <Link href="/Signupform">
            <button className="cta bg-purple-700 py-3 px-6 rounded-lg text-lg hover:bg-purple-600 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center font-bold mb-8">Why Choose EzHire?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Direct Access to Skilled Workers</h3>
              <p>
                EzHire connects you with skilled laborers directly, avoiding middlemen and reducing costs for homeowners while ensuring quality work.
              </p>
            </div>
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Affordable Rates</h3>
              <p>
                We offer fair rates by removing extra charges, providing clients with a cost-effective solution for their construction needs.
              </p>
            </div>
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">High-Paying Jobs for Workers</h3>
              <p>
                EzHire prioritizes workers’ interests by connecting them to high-paying projects nearby, creating better opportunities in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center font-bold mb-8">How It Works</h2>
          <p className="text-lg text-center">
            EzHire simplifies the construction process by providing direct access to skilled workers and enabling homeowners to hire workers with ease. No middlemen, no delays—just efficient and reliable connections.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6 text-center">
        <p>&copy; 2024 EzHire | All rights reserved</p>
      </footer>
    </div>
  );
};

export default EzHire;
