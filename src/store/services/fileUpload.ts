import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueries";

interface SignedUrl {
  url: string;
}

export const fileUpload = createApi({
  reducerPath: "fileUpload",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSignedUrl: builder.mutation<SignedUrl, string>({
      query: (fileName) => ({
        url: "/upload/signed-url/",
        method: "POST",
        body: { fileName },
      }),
    }),

    uploadFile: builder.mutation<void, { url: string; file: File }>({
      queryFn: async ({ url, file }) => {
        try {
          const response = await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
          if (!response.ok) throw new Error("Upload failed");
          return { data: undefined };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),
  }),
});

export const { useGetSignedUrlMutation, useUploadFileMutation } = fileUpload;
