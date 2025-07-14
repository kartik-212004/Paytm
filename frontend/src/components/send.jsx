import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

export default function Send() {
  const [amount, setAmount] = useState("");
  const [status, setstatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { receiver, sender } = location.state || {};
  // const sender = getCurrentUser();

  console.log("Receiver:", receiver);
  console.log("Sender:", sender.email);

  if (!receiver) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Error
          </h2>
          <p className="text-gray-600 mb-4">
            No recipient selected for transaction.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  async function handleSend() {
    try {
      setLoading(true);
      setstatus(null);

      const response = await api.post("/transaction", {
        amount: amount,
        recieverAddress: receiver,
        senderAddress: sender.email,
      });

      const data = response.data;
      console.log(data);

      if (data.status === 200 || response.status === 200) {
        setstatus(true);
      } else {
        setstatus(false);
      }
    } catch (error) {
      console.error("Transaction error:", error);
      setstatus(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <Link
            to="/dashboard"
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
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold text-lg">
              {receiver?.firstname?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
          <span className="text-xl font-semibold text-gray-800">
            {receiver?.firstname} {receiver?.lastname}
            <br />
            <span className="text-sm text-gray-700">
              {receiver?.email}
            </span>
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

        <button
          onClick={handleSend}
          disabled={loading || !amount || !receiver}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {status !== null &&
          (status === false ? (
            <div className="bg-red-500 text-center rounded-md my-1 py-2 text-white">
              Transaction Failed
            </div>
          ) : (
            <div className="bg-green-600 text-center rounded-md my-1 py-2 text-white">
              Transaction Successful
            </div>
          ))}
      </div>
    </div>
  );
}
