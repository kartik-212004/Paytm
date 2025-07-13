import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  getCurrentUser,
  // logout,
} from "../utils/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
      return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);

      setBalance(10000);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   logout();
  // };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user.firstname} {user.lastname}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          {/* <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button> */}
        </div>

        {/* Balance Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your balance
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            Rs {balance.toLocaleString()}
          </p>
        </div>

        {/* Users Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Users
          </h3>

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-semibold">
                    H
                  </span>
                </div>
                <span className="text-gray-800 font-medium">
                  Harkirat Singh
                </span>
              </div>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
