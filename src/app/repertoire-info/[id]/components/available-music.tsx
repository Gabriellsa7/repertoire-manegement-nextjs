import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAddMusicToRepertoire } from "@/hooks/useAddMusicToRepertoire";

interface Music {
  id: string;
  title: string;
}

export const AvailableMusicList = () => {
  const params = useParams();
  const idRepertoire = params.id as string;
  const [music, setMusic] = useState<Music[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const { addMusicToRepertoire, isLoading } = useAddMusicToRepertoire();

  useEffect(() => {
    fetch("http://localhost:8080/music/unassigned")
      .then((res) => res.json())
      .then((data: Music[]) => {
        console.log("Unassigned Musics:", data);
        setMusic(data);
      })
      .catch((error) => console.error("Error fetching music:", error));
  }, []);

  const handleMusicChange = (musicId: string) => {
    setSelectedMusic((prev) =>
      prev.includes(musicId)
        ? prev.filter((id) => id !== musicId)
        : [...prev, musicId]
    );
  };

  const addMusic = async () => {
    if (!idRepertoire || selectedMusic.length === 0) {
      toast.error("Please select at least one Music!");
      return;
    }

    for (const idMusic of selectedMusic) {
      const result = await addMusicToRepertoire({
        idRepertoire,
        idMusic,
        order: 1,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to add music.");
        return;
      }
    }

    toast.success("Music added successfully!", {
      position: "bottom-right",
      duration: 1000,
    });
    setSelectedMusic([]);
  };

  return (
    <>
      <Toaster />
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Select Music:</h3>
          {music.length === 0 ? (
            <p className="text-gray-400">No available Music.</p>
          ) : (
            <div className="space-y-3">
              {music.map((musics) => (
                <div
                  key={musics.id}
                  className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <input
                    type="checkbox"
                    value={musics.id}
                    onChange={() => handleMusicChange(musics.id)}
                    className="mr-2 accent-teal-600"
                  />
                  <span className="text-white">{musics.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {music.length > 0 && (
          <button
            onClick={addMusic}
            className="w-full p-2 bg-teal-600 rounded hover:bg-teal-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Music"}
          </button>
        )}
      </div>
    </>
  );
};
