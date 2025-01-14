import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const RePasswordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 4;
  };

  function validate() {
    if (usernameRef.current.value.length < 3) {
      alert("Username is not valid");
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid. It must be at least 5 characters long.");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }

    if (passwordRef.current.value !== RePasswordRef.current.value) {
      alert("Passwords do not match");
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
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);

    axios
      .post("https://auth-rg69.onrender.com/api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "User registered successfully!") {
          navigate("/login");
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          RePasswordRef.current.value = "";
        } else if (
          response.data.message === "Failed! Username is already in use!" ||
          response.data.message === "Failed! Email is already in use!"
        ) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert("Something went wrong. Please try again.");
      })
        .finally(() => {
            setLoading(false);
        });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-6">
          Register
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter email"
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
              placeholder="Create password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Confirm Password
            </label>
            <input
              ref={RePasswordRef}
              type="password"
              id="repassword"
              className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Re-enter password"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              onClick={handRegister}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                {loading ? "Registering..." : "Register"}
            </button>
            <Link
              to="/login"
              className="text-center text-purple-600 hover:text-purple-700 mt-4"
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;