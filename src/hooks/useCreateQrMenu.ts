import { useState } from "react";
import {
  useCreateQrMenuMutation,
  useGetUploadUrlMutation,
} from "../store/services/qrMenuApi";
import { UploadUrl } from "../types/request";
import { useUploadFileMutation } from "../store/services/fileUpload";
import { QrMenu } from "../types";

export const useCreateQrMenu = () => {
  const [createQrMenu] = useCreateQrMenuMutation();
  const [uploadFile] = useUploadFileMutation();
  const [getUploadUrl] = useGetUploadUrlMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMenu = async (menuData: QrMenu, file: File) => {
    setLoading(true);
    setError(null);

    try {
      const requestUploadUrl: UploadUrl = {
        file_key: menuData.file_key,
      };
      const uploadUrlData = await getUploadUrl(requestUploadUrl).unwrap();

      if (!uploadUrlData?.success) {
        throw new Error(
          typeof uploadUrlData?.message === "string"
            ? uploadUrlData.message
            : "An unexpected error occurred."
        );
      }

      const renamedFile = new File([file], uploadUrlData.data.file_key, {
        type: file.type,
      });
      await uploadFileToS3(uploadUrlData.data.upload_url, renamedFile);

      const request: QrMenu = {
        ...menuData,
        file_key: uploadUrlData.data.file_key,
      };

      const response = await createQrMenu(request).unwrap();
      return response;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    try {
      const response = await uploadFile({ url: uploadUrl, file }).unwrap();
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { createMenu, loading, error };
};
