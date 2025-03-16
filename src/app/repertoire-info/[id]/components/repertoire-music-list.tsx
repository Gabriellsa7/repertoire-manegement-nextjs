import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Music {
  id: string;
  title: string;
  imageUrl: string;
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
    <div className="flex flex-col gap-4">
      <span className="text-lg font-bold">Repertoire Music</span>
      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {repertoireMusic &&
          repertoireMusic.map((music) => (
            <div
              className="flex flex-col gap-2 min-w-[80px]"
              key={music.id}
              onClick={() => router.push(`/music/${music.id}`)}
            >
              <div className="relative flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden p-3">
                <Image
                  src={music.imageUrl}
                  alt={music.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-16">
                <h3 className="text-lg font-bold truncate">{music.title}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
