import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { getStoredTokens } from "../utils/auth";
import { useLogoutMutation } from "../store/services/authApi";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const tokens = getStoredTokens();

    try {
      if (tokens.refresh) {
        await logoutApi({ refresh: tokens.refresh }).unwrap();
      }
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout on client side even if API fails
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  return { logoutUser, isLoading };
};
