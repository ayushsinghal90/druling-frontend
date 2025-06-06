import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import LoadingScreen from "../common/LoadingScreen";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectTo = "/dashboard",
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
