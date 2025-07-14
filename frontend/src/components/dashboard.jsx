import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  getCurrentUser,
  logout,
} from "../utils/auth";
import api from "../utils/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
      return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await api.post("/balance", {});
      if (response.data.value !== undefined) {
        setBalance(response.data.value);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/allUsers");
      if (response.data.users) {
        const filteredUsers = response.data.users.filter(
          (u) => u._id !== user?.id
        );
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      fetchAllUsers();
      fetchBalance();
    }
  }, [user, fetchAllUsers, fetchBalance]);

  const searchUsers = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        fetchAllUsers();
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(
          `/users?search=${searchQuery}`
        );
        if (response.data.users) {
          const filteredUsers = response.data.users.filter(
            (u) => u._id !== user?.id
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    },
    [user, fetchAllUsers]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);

      // Debounce search
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        searchUsers(value);
      }, 300);
    },
    [searchUsers]
  );

  const handleLogout = () => {
    logout();
  };

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
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
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
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User List */}
          <div className="bg-white rounded-lg shadow-sm">
            {loading ? (
              <div className="p-4 text-center">
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              users.map((userItem) => (
                <div
                  key={userItem._id}
                  className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-semibold">
                        {userItem.firstname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium block">
                        {userItem.firstname} {userItem.lastname}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {userItem.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/send", {
                        state: {
                          receiver: userItem.email,
                          sender: user,
                        },
                      })
                    }
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Send Money
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
