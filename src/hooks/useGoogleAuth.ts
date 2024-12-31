import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "../store/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export const useGoogleAuth = () => {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const result = await googleLogin({
        token: credentialResponse.credential || "",
      }).unwrap();

      if (result.success) {
        const { payload, access, refresh } = result.data;
        dispatch(
          setCredentials({
            user: payload,
            tokens: { access, refresh },
          })
        );
        navigate("/dashboard");
      }
    } catch {
      toast.error("Google Login Failed");
    }
  };

  const handleError = () => {
    toast.error("Google Login Failed");
  };
  //     onSuccess: async (tokenResponse) => {
  //       try {
  //         const result = await googleLogin({
  //           token: tokenResponse.access_token,
  //         }).unwrap();

  //         if (result.success) {
  //           const { payload, access, refresh } = result.data;
  //           dispatch(
  //             setCredentials({
  //               user: payload,
  //               tokens: { access, refresh },
  //             })
  //           );
  //           navigate("/dashboard");
  //         }
  //       } catch (error) {
  //         console.error("Error during Google login:", error);
  //         // Optionally, set an error state or show a toast
  //       }
  //     },
  //     onError: (error) => {
  //       console.error("Google Login Failed", error);
  //       // Optionally, set an error state or show a toast
  //     },
  //   });

  return { handleSuccess, handleError };
};
