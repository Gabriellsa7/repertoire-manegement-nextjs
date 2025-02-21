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
    <div className="min-h-screen bg-gray-950 p-4 text-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add a New Music</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter Music Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              File Upload
            </label>
            <label
              htmlFor="file-upload"
              className="w-full p-2 bg-teal-600 text-white text-center rounded cursor-pointer hover:bg-teal-700"
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
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">PDF</span>{" "}
                      <p className="text-sm font-medium text-white">
                        {file.file.name}
                      </p>
                      <span className="text-gray-500 text-xs">
                        {(file.file.size / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                    <progress
                      value={file.progress}
                      max="100"
                      className="w-full h-2 bg-gray-700 rounded"
                    ></progress>
                    {file.status === "failed" && (
                      <p className="text-red-500 text-xs mt-1">Upload Failed</p>
                    )}
                    {file.progress > 0 && file.progress < 100 && (
                      <p className="text-gray-400 text-xs mt-1">
                        {file.progress}% ({Math.random() * 10 + 5}s left)
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {file.status === "failed" && (
                      <button
                        onClick={() => uploadFile(file.musicId, file.file)}
                        className="bg-yellow-500 text-black px-2 py-1 text-xs rounded flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15"
                          />
                        </svg>
                        Retry
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setFiles((prev) => prev.filter((f) => f.id !== file.id))
                      }
                      className="text-gray-400 hover:text-white"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => alert("Music added successfully!")}
            disabled={!files.length}
            className={`w-full p-2 rounded ${
              files.length
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-gray-600 cursor-not-allowed"
            } text-white`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMusic;
