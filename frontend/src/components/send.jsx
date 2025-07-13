import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Send() {
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Send Money
        </h1>

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            Friend's Name
          </span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (in Rs)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="123"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}
