import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";
import { FileUploadSignedUrl, UploadFile } from "../../types/request";
import { ApiResponse, SignedUrl } from "../../types/response";

export const fileUpload = createApi({
  reducerPath: "fileUpload",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSignedUrl: builder.mutation<
      ApiResponse<SignedUrl[]>,
      FileUploadSignedUrl
    >({
      query: (data) => ({
        url: "/file/upload_url/",
        method: "POST",
        body: data,
      }),
    }),

    uploadFile: builder.mutation<void, UploadFile>({
      queryFn: async (uploadFile) => {
        try {
          const response = await fetch(uploadFile.url, {
            method: "PUT",
            body: uploadFile.file,
            headers: {
              "Content-Type": uploadFile.file.type,
            },
          });
          if (!response.ok) throw new Error("Upload failed");
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),

    batchUploadFiles: builder.mutation<void, UploadFile[]>({
      queryFn: async (uploadFiles) => {
        try {
          const uploadPromises = uploadFiles.map((uploadFile) =>
            fetch(uploadFile.url, {
              method: "PUT",
              body: uploadFile.file,
              headers: {
                "Content-Type": uploadFile.file.type,
              },
            })
          );
          const responses = await Promise.all(uploadPromises);
          responses.forEach((response) => {
            if (!response.ok) throw new Error("Batch upload failed");
          });
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),
  }),
});

export const {
  useGetSignedUrlMutation,
  useUploadFileMutation,
  useBatchUploadFilesMutation,
} = fileUpload;
