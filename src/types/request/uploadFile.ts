export interface UploadFile {
  url: string;
  file: File;
}

export interface FileUploadSignedUrl {
  params: Record<string, string>;
  file_type?: string;
  files: FileDetails[];
}

export interface FileDetails {
  file_key: string;
}
