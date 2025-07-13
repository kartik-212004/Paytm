import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        }
      );

      if (response.status == 200) {
        return navigate("/signin");
      }
      setError(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up for your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="firstname" className="label-form">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstname"
                placeholder="Kartik"
                name="firstname"
                onChange={(e) => {
                  setData({ ...data, firstname: e.target.value });
                }}
                value={data.firstname}
                type="text"
                required
                autoComplete="given-name"
                className="input-form"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastname" className="label-form">
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                onChange={(e) => {
                  setData({ ...data, lastname: e.target.value });
                }}
                value={data.lastname}
                placeholder="Bhatt"
                required
                autoComplete="family-name"
                className="input-form"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="label-form">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                value={data.email}
                placeholder="kartik@gmail.com"
                required
                autoComplete="email"
                className="input-form"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label-form">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                value={data.password}
                placeholder="Enter your password"
                type="password"
                required
                autoComplete="new-password"
                className="input-form"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
