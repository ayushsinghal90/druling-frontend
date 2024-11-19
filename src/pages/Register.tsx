import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout
      title="Get started"
      subtitle="Create your account and start digitalizing your menu"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;