import { useState } from "react";
import {
  useCreateQrMenuMutation,
  useGetUploadUrlMutation,
} from "../store/services/qrMenuApi";
import { UploadFile, UploadMenu, UploadMenuImage } from "../types/request";
import { useBatchUploadFilesMutation } from "../store/services/fileUpload";
import { Branch } from "../types";
import { ImageData } from "../components/qr/utils/ImageData";
import { SignedUrl } from "../types/response";

export const useCreateQrMenu = () => {
  const [createQrMenu] = useCreateQrMenuMutation();
  const [batchUploadFiles] = useBatchUploadFilesMutation();
  const [getUploadUrl] = useGetUploadUrlMutation();
  const [loading, setLoading] = useState(false);

  const createMenu = async (branch: Branch, imagesData: ImageData[]) => {
    setLoading(true);

    const requestUploadMenu: UploadMenu = {
      branch_id: branch.id || "",
      files: imagesData.map(
        (image) =>
          ({
            file_key: image.file.name,
            category: image.category,
            order: image.order,
          } as UploadMenuImage)
      ),
    };
    const fileToSingedUrlMap = await getSignedUrls(requestUploadMenu);

    await uploadFilesToS3(getUploadFileRequest(imagesData, fileToSingedUrlMap));

    requestUploadMenu.files.forEach((file) => {
      file.file_key = fileToSingedUrlMap[file.file_key].new_file_key;
    });

    const response = await createQrMenu(requestUploadMenu).unwrap();
    return response;
  };

  const getUploadFileRequest = (
    imagesData: ImageData[],
    fileToSingedUrlMap: { [key: string]: SignedUrl }
  ) => {
    return imagesData.map((imageData) => {
      const signedUrl = fileToSingedUrlMap[imageData.file.name];
      if (!signedUrl) {
        throw new Error("No signed url found for file.");
      }

      const renamedFile = new File([imageData.file], signedUrl.new_file_key, {
        type: imageData.file.type,
      });

      return {
        url: signedUrl.upload_url,
        file: renamedFile,
      } as UploadFile;
    });
  };

  const getSignedUrls = async (requestUploadMenu: UploadMenu) => {
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

  return { createMenu, loading };
};
