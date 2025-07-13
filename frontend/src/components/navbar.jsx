import React from "react";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
export default function Navbar() {
  const currentUser = getCurrentUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="bg-black text-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold ">
              PayTm
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/send"
              className=" px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Send Money
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className=" font-semibold text-sm">
                {currentUser.firstname[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
