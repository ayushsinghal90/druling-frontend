import { useState } from "react";
import { useCreateQrMenuMutation } from "../store/services/qrMenuApi";
import { UploadMenu, UploadMenuImage } from "../types/request";
import { useFileUpload } from "./useFileUpload";
import { Branch } from "../types";
import { ImageData } from "../components/qr/utils/ImageData";

export const useCreateQrMenu = () => {
  const [createQrMenu] = useCreateQrMenuMutation();
  const { uploadFiles } = useFileUpload();
  const [loading, setLoading] = useState(false);

  const createMenu = async (
    branch: Branch,
    theme: string,
    imagesData: ImageData[]
  ) => {
    setLoading(true);

    try {
      const fileToSingedUrlMap = await uploadFiles(
        { branch_id: branch.id || "" },
        "qr_menu",
        imagesData.map((image) => image.file)
      );

      const requestUploadMenu: UploadMenu = {
        branch_id: branch.id || "",
        theme,
        files: imagesData.map(
          (image) =>
            ({
              file_key: image.file.name,
              category: image.category,
              order: image.order,
            } as UploadMenuImage)
        ),
      };

      requestUploadMenu.files.forEach((file) => {
        file.file_key = fileToSingedUrlMap[file.file_key].new_file_key;
      });

      const response = await createQrMenu(requestUploadMenu).unwrap();
      return response;
    } finally {
      setLoading(false);
    }
  };

  return { createMenu, loading };
};
