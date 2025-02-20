"use client";
import useFileUpload from "@/hooks/uploadPdf";
import { useState } from "react";

const CreateMusic = () => {
  const [title, setTitle] = useState("");
  const { files, uploadFile, setFiles } = useFileUpload();
  const [musicId, setMusicId] = useState<string | null>(null);

  const createMusic = async () => {
    try {
      const response = await fetch("http://localhost:8080/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Error Creating music");

      const music = await response.json();
      setMusicId(music.id);

      return music.id;
    } catch (error) {
      console.error(error);
      alert("Error Creating music");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!musicId) {
        const newMusicId = await createMusic();
        if (newMusicId) uploadFile(newMusicId, file);
      } else {
        uploadFile(musicId, file);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Add a New Music</h2>
      <input
        type="text"
        placeholder="Enter Music Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
      />
      <label
        htmlFor="file-upload"
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 transition p-2 rounded cursor-pointer mb-4"
      >
        Choose Files
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        hidden
      />
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{file.file.name}</p>
              <progress
                value={file.progress}
                max="100"
                className="w-full"
              ></progress>
              {file.status === "failed" && (
                <p className="text-red-400 text-xs">Upload Failed</p>
              )}
            </div>
            <div className="flex space-x-2">
              {file.status === "failed" && (
                <button
                  onClick={() => uploadFile(file.musicId, file.file)}
                  className="bg-yellow-500 text-black px-2 py-1 text-xs rounded"
                >
                  Retry
                </button>
              )}
              <button
                onClick={() =>
                  setFiles((prev) => prev.filter((f) => f.id !== file.id))
                }
                className="bg-red-600 px-2 py-1 text-xs rounded"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => alert("Music added successfully!")}
        disabled={!files.length}
        className={`mt-4 w-full p-2 rounded ${
          files.length
            ? "bg-green-600 hover:bg-green-700 transition"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Add
      </button>
    </div>
  );
};

export default CreateMusic;
