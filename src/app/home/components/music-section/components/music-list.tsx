"use client";
import React from "react";
import Image from "next/image";
import { useFetchMusics } from "@/hooks/useFetchMusics";
import { useRouter } from "next/navigation";

export const MusicList = () => {
  const { musics, loading, error } = useFetchMusics();

  const router = useRouter();

  const handleButton = () => {
    router.push("/create-music");
  };

  return (
    <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : musics.length > 0 ? (
        musics.map((music) => (
          <div
            className="flex flex-col gap-2 min-w-[80px]"
            key={music.id}
            onClick={() => router.push(`/music/${music.id}`)}
          >
            <div className="relative flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={music.imageUrl}
                alt={music.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="w-16">
              <h3 className="text-lg font-bold truncate">{music.title}</h3>
            </div>
          </div>
        ))
      ) : (
        ""
      )}

      {/* Add button */}
      <button
        className="flex bg-transparent items-center min-w-[80px] pb-9"
        onClick={handleButton}
      >
        <Image src="/assets/plus2.png" alt="plus icon" width={32} height={32} />
      </button>
    </div>
  );
};
