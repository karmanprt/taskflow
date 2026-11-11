
import { useState } from "react";
import { Link } from "react-router";
import FormInput from "../components/FormInput";

function Login() {
  // Stores login form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Stores validation errors
  const [errors, setErrors] = useState({});

  // Controls password visibility
  const [showPassword, setShowPassword] = useState(false);

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
  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    // Stop submission if validation errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // API integration will happen on Day 9
    console.log("Login data:", formData);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">

        <h1 className="mb-6 text-center text-2xl font-bold">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <FormInput
            label="Email"
            type="email"
            name="email"
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Login
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

      </div>
    </div>
  );
}

export default Login;
