import { useState } from "react";
import { Link, useNavigate } from "react-router";

import FormInput from "../components/FormInput";
import { loginUser } from "../services/authService";
import useAuth from "../context/useAuth";

import AuthLayout from "../components/AuthLayout";

function Login() {
  // Allows programmatic navigation
  const navigate = useNavigate();

  // Access the login function from AuthContext
  const { login } = useAuth();

  // Stores login form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Stores frontend validation errors
  const [errors, setErrors] = useState({});

  // Controls password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Tracks whether the login request is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stores backend or network errors
  const [serverError, setServerError] = useState("");

  // Updates the input that the user changes
  function handleChange(e) {
    const { name, value } = e.target;

    // Update the corresponding form field
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the field being corrected
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Clear previous server error
    setServerError("");
  }

  // Validates the login form
  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  }

  // Handles form submission
  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");

    const validationErrors = validate();

    setErrors(validationErrors);

    // Stop submission if validation errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send login credentials to the backend
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Save the returned token and user in AuthContext
      login(data);

      // Navigate to the Tasks page
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message;

      if (message) {
        setServerError(message);
      } else if (!error.response) {
        setServerError("Cannot reach the server. Please try again.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      panelSide="left"
      heading="Welcome Back!"
      description="Your tasks are waiting. Sign in and continue making progress."
      switchLabel="Create an account"
      switchTo="/register"
    >
      <>
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <FormInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />

          {/* Password input with show/hide button */}
          <div className="relative">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Always reserve space for backend errors */}
          <div className="mt-1 mb-4 min-h-10">
            {serverError && (
              <p className="text-sm leading-5 text-red-500" role="alert">
                {serverError}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to registration page */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </>
    </AuthLayout>
  );
}

export default Login;
