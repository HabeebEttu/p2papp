import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { register } from "../redux/slices/authSlice";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
    //   .matches(
    //     /[!@#$%^&*]/,
    //     "Password must contain at least one special character (!@#$%^&*)"
    //   )
      .required("Password is required"),
    password_confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard ");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      dispatch(
        register({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      );
    } catch (error) {
      const errors = {};
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      } else if (error.message) {
        // Fallback for other error types
        console.error("Validation error:", error.message);
      }
      setFormErrors(errors);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && (
            <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
          )}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && (
            <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Username and Email Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formErrors.username && (
            <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
          )}
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>
      </div>

      {/* Password Fields */}
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
            formErrors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
        )}
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="password_confirm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          className={`flex w-full h-12 px-3 py-1 text-base text-gray-900 placeholder-gray-400 transition-colors bg-transparent border rounded-md shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:border-blue-500 focus:ring-blue-500 ${
            formErrors.password_confirm ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Confirm your password"
          name="password_confirm"
          value={formData.password_confirm}
          onChange={handleChange}
        />
        {formErrors.password_confirm && (
          <p className="mt-1 text-sm text-red-500">
            {formErrors.password_confirm}
          </p>
        )}
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary shadow hover:bg-primary/90 px-4 py-2 w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold !rounded-button whitespace-nowrap cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      {error && <p className="text-sm text-center text-red-500">{error}</p>}
    </form>
  );
}
