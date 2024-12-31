import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/services/authApi";
import { logout } from "../../store/slices/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call logout API endpoint
        await logoutApi().unwrap();
      } catch (error) {
        console.error("Logout API error:", error);
      } finally {
        // Clear local auth state regardless of API success
        dispatch(logout());
        // Redirect to login page
        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [dispatch, navigate, logoutApi]);

  // Return null as this is just a functional component
  return null;
};

export default Logout;
