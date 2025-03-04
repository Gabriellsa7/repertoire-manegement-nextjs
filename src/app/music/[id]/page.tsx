"use client";
import { useEffect, useState } from "react";
import useFileDownload from "@/hooks/usePdfDownload";
import { useParams, useRouter } from "next/navigation";
import { MusicHeader } from "./components/music-info-header";

interface Music {
  id: string;
  title: string;
}

const MusicDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { downloadFile } = useFileDownload();
  const [music, setMusic] = useState<Music | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/music/${id}`)
        .then((res) => res.json())
        .then((data) => setMusic(data))
        .catch((err) => console.error("Error Find Music:", err));
    }
  }, [id]);

  if (!music) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <MusicHeader />
      <h2 className="text-xl font-semibold mb-4">{music.title}</h2>
      <p className="text-sm text-gray-400">ID: {music.id}</p>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => downloadFile(music.id, false)}
          className="w-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          🔽 Download PDF
        </button>

        <button
          onClick={() => downloadFile(music.id, true)}
          className="w-1/2 bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          🌐 Open PDF
        </button>
      </div>
      <button
        onClick={() => router.push("/home")}
        className="mt-4 w-full bg-gray-700 hover:bg-gray-800 p-2 rounded"
      >
        ⬅️ Back
      </button>
    </div>
  );
};

export default MusicDetails;
