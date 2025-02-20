import { useState } from "react";

interface UploadFile {
  id: string;
  musicId: string;
  file: File;
  progress: number;
  status: "uploading" | "failed" | "success";
}

const useFileUpload = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const uploadFile = async (musicId: string, file: File) => {
    const fileId = crypto.randomUUID();
    const newFile: UploadFile = {
      id: fileId,
      musicId,
      file,
      progress: 0,
      status: "uploading",
    };
    setFiles((prev) => [...prev, newFile]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8080/music/${musicId}/upload-pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error no upload");

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress: 100, status: "success" } : f
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? { ...f, status: "failed" } : f))
      );
      console.log(error);
    }
  };

  return { files, uploadFile, setFiles };
};

export default useFileUpload;
