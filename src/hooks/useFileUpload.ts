import { useState } from "react";
import { FileUploadSignedUrl, UploadFile } from "../types/request";
import {
  useBatchUploadFilesMutation,
  useGetSignedUrlMutation,
} from "../store/services/fileUpload";
import { SignedUrl } from "../types/response";

export const useFileUpload = () => {
  const [batchUploadFiles] = useBatchUploadFilesMutation();
  const [getUploadUrl] = useGetSignedUrlMutation();
  const [loading, setLoading] = useState(false);

  const uploadFiles = async (
    params: Record<string, string>,
    file_type: string,
    files: File[]
  ) => {
    setLoading(true);

    try {
      const requestUploadMenu: FileUploadSignedUrl = {
        params,
        file_type,
        files: files.map((file) => ({
          file_key: file.name,
        })),
      };
      const fileToSingedUrlMap = await getSignedUrls(requestUploadMenu);

      await uploadFilesToS3(getUploadFileRequest(files, fileToSingedUrlMap));

      return fileToSingedUrlMap;
    } finally {
      setLoading(false);
    }
  };

  const getUploadFileRequest = (
    files: File[],
    fileToSingedUrlMap: { [key: string]: SignedUrl }
  ) => {
    return files.map((file) => {
      const signedUrl = fileToSingedUrlMap[file.name];
      if (!signedUrl) {
        throw new Error("No signed url found for file.");
      }

      const renamedFile = new File([file], signedUrl.new_file_key, {
        type: file.type,
      });

      return {
        url: signedUrl.upload_url,
        file: renamedFile,
      } as UploadFile;
    });
  };

  const getSignedUrls = async (requestUploadMenu: FileUploadSignedUrl) => {
    const singedUrlResponse = await getUploadUrl(requestUploadMenu).unwrap();

    if (!singedUrlResponse?.success) {
      throw new Error(
        typeof singedUrlResponse?.message === "string"
          ? singedUrlResponse.message
          : "An unexpected error occurred."
      );
    }

    return singedUrlResponse.data.reduce(
      (acc: { [key: string]: SignedUrl }, signedUrl) => {
        acc[signedUrl.file_key] = signedUrl;
        return acc;
      },
      {}
    );
  };

  const uploadFilesToS3 = async (uploadFiles: UploadFile[]) => {
    try {
      const response = await batchUploadFiles(uploadFiles).unwrap();
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { uploadFiles, loading };
};
