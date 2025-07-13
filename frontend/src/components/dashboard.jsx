import React from "react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Balance Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your balance
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            Rs 10,000
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
