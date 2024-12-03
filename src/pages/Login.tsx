import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

const Login = () => {
  useRedirectIfAuthenticated();

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
