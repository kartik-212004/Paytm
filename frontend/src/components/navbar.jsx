import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
              to="/"
              className=" px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/send"
              className=" px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Send Money
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className=" font-semibold text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
