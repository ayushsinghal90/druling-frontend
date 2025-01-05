import { useState } from "react";
import {
  useSendCodeMutation,
  useVerifyMutation,
} from "../store/services/emailVerify";

export const useEmailVerify = () => {
  const [sendCode] = useSendCodeMutation();
  const [verify] = useVerifyMutation();
  const [isLoading, setIsLoading] = useState(false);

  const sendVerificationCode = async (email: string) => {
    try {
      setIsLoading(true);
      return await sendCode({ email }).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      return await verify({ email, code }).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendVerificationCode,
    verifyCode,
    isLoading,
  };
};
