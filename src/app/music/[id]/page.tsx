"use client";
import { useEffect, useState } from "react";
import useFileDownload from "@/hooks/usePdfDownload";
import { useParams } from "next/navigation";
import { MusicHeader } from "./components/music-info-header";

interface Music {
  id: string;
  title: string;
}

const MusicDetails = () => {
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
    <div className="p-6 bg-gray-900 shadow-md text-white">
      <MusicHeader />

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
    </div>
  );
};

export default MusicDetails;
