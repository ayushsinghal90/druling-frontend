import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import {
  isValidEmail,
  isValidPassword,
  getPasswordStrengthMessage,
} from "../../utils/validation";
import { config } from "../../config/env";
import GoogleAuth from "./GoogleAuth";
import { useEmailVerify } from "../../hooks/useEmailVerify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const {
    sendVerificationCode,
    verifyCode,
    isLoading: verificationInProcess,
  } = useEmailVerify();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  });

  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    // Simulate resending verification code
  };

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      form: "",
    };

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = getPasswordStrengthMessage(formData.password);
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.email || !isValidEmail(formData.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Valid email is required",
        }));
        return;
      }
      await sendVerificationCode(formData.email);

      // Simulate sending verification code
      setStep(2);
    } else if (step === 2) {
      // Handle email verification
      try {
        const result = await verifyCode(formData.email, verificationCode);

        if (result.success) {
          setStep(3);
        } else {
          setErrors((prev) => ({
            ...prev,
            form: result.message || "Verification failed",
          }));
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          form: "Verification failed. Please try again.",
        }));
      }
    } else if (step === 3) {
      if (!validateForm()) {
        return;
      }

      try {
        const registerResult = await register({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }).unwrap();

        if (registerResult.success) {
          const { profile, access, refresh } = registerResult.data;
          dispatch(
            setCredentials({
              profile,
              tokens: { access, refresh },
            })
          );
          navigate("/dashboard");
        } else {
          setErrors((prev) => ({
            ...prev,
            form: registerResult.message || "Registration failed",
          }));
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          form: "Registration failed. Please try again.",
        }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {step === 1 && (
        <div className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.form}
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
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending code..." : "Next"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.form}
            </div>
          )}
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <div className="mt-1">
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
            <div className="text-sm text-gray-600">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-black hover:text-gray-700 transition-colors duration-200"
                >
                  Resend Code
                </button>
              ) : (
                `Resend code in ${timer}s`
              )}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.form}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.first_name ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm`}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.first_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border ${
                    errors.last_name ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm`}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.last_name}
                  </p>
                )}
              </div>
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full appearance-none rounded-md border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black transition-all duration-200 sm:text-sm`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black transition-colors duration-200"
            />
            <label
              htmlFor="acceptTerms"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </div>
        </div>
      )}

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
            <div className="flex justify-center text-center">
              <GoogleAuth />
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm mt-5">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black hover:text-gray-700 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
