import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

export const RepertoireMusicList = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [repertoireMusic, setRepertoireMusic] = useState<Music[]>([]);
  const url = "http://localhost:8080";

  useEffect(() => {
    fetch(`${url}/repertoire-music/${id}/musics`)
      .then((res) => res.json())
      .then((data) => {
        setRepertoireMusic(data);
      })
      .catch((err) => console.error("Error fetching Repertoire Music:", err));
  });

  return (
    <div>
      <span className="text-lg font-bold">Repertoire Music</span>
      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {repertoireMusic &&
          repertoireMusic.map((music) => (
            <div
              className="flex flex-col gap-2 min-w-[80px]"
              key={music.id}
              onClick={() => router.push(`/music/${music.id}`)}
            >
              <div className="flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden p-3"></div>
              <div className="w-16">
                <h3 className="text-lg font-bold truncate">{music.title}</h3>
              </div>
            </div>
          ))}

        {/* Add button
                <button
                  className="pb-9 min-w-[80px]"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src="/assets/plus2.png"
                    alt="plus icon"
                    width={32}
                    height={32}
                  />
                </button> */}
      </div>
    </div>
  );
};
