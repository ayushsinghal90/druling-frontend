import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store";
import { setCredentials } from "../store/slices/authSlice";
import { getStoredTokens } from "../utils/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Check for stored tokens on mount
    const tokens = getStoredTokens();
    if (tokens.access && tokens.refresh) {
      dispatch(
        setCredentials({
          tokens: {
            access: tokens.access,
            refresh: tokens.refresh,
          },
        })
      );
    }
  }, [dispatch]);

  return { user, isAuthenticated };
};
