import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold text-blue-600">
          URL Shortener
        </Link>
        <div className="space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-600 hover:text-blue-600 transition">Sign In</Link>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
