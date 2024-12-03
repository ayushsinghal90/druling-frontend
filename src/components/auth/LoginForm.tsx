import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "../SocialIcons";
import { useLoginMutation } from "../../store/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { setAuthToken } from "../../utils/storage";
import { isValidEmail } from "../../utils/validation";
import { config } from "../../config/env";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      form: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Reset create account prompt when user modifies input
    setShowCreateAccount(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      setAuthToken(result.token);
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err: any) {
      // Check if the error indicates the account doesn't exist
      if (err?.data?.code === "USER_NOT_FOUND") {
        setShowCreateAccount(true);
        setErrors((prev) => ({
          ...prev,
          form: "We couldn't find an account with this email address.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Invalid email or password",
        }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-6">
        {errors.form && (
          <div className="text-sm bg-red-50 p-4 rounded-md">
            <p className="text-red-600">{errors.form}</p>
            {showCreateAccount && (
              <div className="mt-2">
                <p className="text-gray-700">
                  Would you like to create an account?
                </p>
                <Link
                  to={`/register?email=${encodeURIComponent(formData.email)}`}
                  className="mt-2 inline-flex items-center text-sm font-medium text-black hover:text-gray-700"
                >
                  Create account →
                </Link>
              </div>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`block w-full appearance-none rounded-md border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`block w-full appearance-none rounded-md border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black transition-colors duration-200"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {config.features.socialLogin && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="flex w-full justify-center items-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transform hover:scale-105 transition-all duration-200"
            >
              <GoogleIcon className="h-5 w-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
