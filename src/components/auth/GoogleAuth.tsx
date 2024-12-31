import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { config } from "../../config/env";

const GoogleAuth = () => {
  const { handleSuccess, handleError } = useGoogleAuth();

  return (
    <GoogleOAuthProvider clientId={config.googleAuth.clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        type={"standard"}
        text={"signup_with"}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
