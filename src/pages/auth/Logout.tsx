import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import LoadingScreen from "../../components/common/LoadingScreen";

const Logout = () => {
  const navigate = useNavigate();
  const { logoutUser, isLoading } = useLogout();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      navigate("/login", { replace: true });
    }
  }, [logoutUser, navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
};

export default Logout;
