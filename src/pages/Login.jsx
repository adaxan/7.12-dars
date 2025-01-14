import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }

    if (passwordRef.current.value.length < 6) {
      alert("Password should be at least 6 characters long.");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }

    return true;
  }

  function handRegister(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    axios
      .post("https://auth-rg69.onrender.com/api/auth/signin", user, {
        headers: {
          "Content-type": "application/json", 
        },
      })
      .then((response) => {
        if (response.data.id) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.accessToken);
          navigate("/");
          usernameRef.current.value = "";
          passwordRef.current.value = "";
        }
        if (
          response.data.message == "User Not found." ||
          response.data.message == "Invalid Password!"
        ) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("An error occurred during login. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handGoRegister(event) {
    event.preventDefault();
    navigate("/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-6">
          Login
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
            disabled={loading}
              type="submit"
              onClick={handRegister}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handGoRegister}
              className="text-purple-600 hover:underline"
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;