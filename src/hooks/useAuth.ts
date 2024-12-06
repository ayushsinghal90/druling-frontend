import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import { setCredentials } from "../store/slices/authSlice";
import { getStoredTokens } from "../utils/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    setLoading(false); // Authentication check is complete
  }, [dispatch]);

  return { user, isAuthenticated, loading };
};
