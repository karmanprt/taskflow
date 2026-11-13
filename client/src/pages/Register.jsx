import { useState } from "react";
import { Link, useNavigate } from "react-router";

import FormInput from "../components/FormInput";
import { registerUser } from "../services/authService";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const navigate = useNavigate();

  // Stores registration form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Stores frontend validation errors
  const [errors, setErrors] = useState({});

  // Independent password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Tracks registration request status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stores backend or network errors
  const [serverError, setServerError] = useState("");

  // Updates the input that the user changes
  function handleChange(e) {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      // Validate password length while typing
      if (name === "password") {
        if (value && value.length < 6) {
          updatedErrors.password = "Password must be at least 6 characters";
        } else {
          delete updatedErrors.password;
        }
      }

      // Only validate confirm password after an attempted submission
      if (
        (name === "password" || name === "confirmPassword") &&
        prevErrors.confirmPassword
      ) {
        if (
          updatedData.confirmPassword &&
          updatedData.password !== updatedData.confirmPassword
        ) {
          updatedErrors.confirmPassword = "Passwords do not match";
        } else if (
          !updatedData.confirmPassword &&
          prevErrors.confirmPassword === "Please confirm your password"
        ) {
          updatedErrors.confirmPassword = "Please confirm your password";
        } else {
          delete updatedErrors.confirmPassword;
        }
      }

      // Clear other field errors when edited
      if (name !== "password" && name !== "confirmPassword") {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });

    setServerError("");
  }

  // Validates registration form values
  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }

  // Handles form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send only the required fields to the backend
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Registration successful: redirect to login
      navigate("/login");
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
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      panelSide="right"
      heading="Join Taskflow!"
      description="Bring your tasks together, stay organized and achieve more every day."
      switchLabel="Already have an account? Login"
      switchTo="/login"
    >
      <>
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Create your account
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <FormInput
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your name"
          />

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

          {/* Password input */}
          <div className="relative">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
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

          {/* Confirm password input */}
          <div className="relative">
            <FormInput
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-blue-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Backend or network errors */}
          {serverError && (
            <p className="mb-4 text-sm text-red-500" role="alert">
              {serverError}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </>
    </AuthLayout>
  );
}

export default Register;
