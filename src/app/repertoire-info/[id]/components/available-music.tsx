import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface Music {
  id: string;
  title: string;
  repertoire: Repertoire;
}

interface Repertoire {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  music: Music;
}

export const AvailableMusicList = () => {
  const params = useParams();
  const id = params.id as string;

  const [music, setMusic] = useState<Music[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const url = "http://localhost:8080";

  useEffect(() => {
    fetch(`${url}/music`)
      .then((res) => res.json())
      .then((data: Music[]) => {
        //modify this method to list just musics available

        // const unassignedMusic = data.filter(
        //   (music) => music.repertoire === null
        // );
        // console.log("Unassigned Musics:", unassignedMusic);

        setMusic(data);
      });
  });

  const handleMusicChange = (musicId: string) => {
    setSelectedMusic((prev) =>
      prev.includes(musicId)
        ? prev.filter((id) => id !== musicId)
        : [...prev, musicId]
    );
  };

  const addMusic = async () => {
    if (!id || selectedMusic.length === 0) {
      alert("Please select at least one Music!");
      return;
    }

    for (const musicId of selectedMusic) {
      //add dynamic order
      await fetch(
        `http://localhost:8080/repertoire-music/${id}/add-music/${musicId}?order=1`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      location.reload();
    }

    toast.success("music added successfully", {
      position: "bottom-right",
      duration: 1000,
    });
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
          >
            Add Music
          </button>
        )}
      </div>
    </>
  );
};
