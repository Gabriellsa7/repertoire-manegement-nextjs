import useDeleteMusic from "@/hooks/useDeleteMusic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowBackSharp, IoTrash } from "react-icons/io5";

interface Music {
  id: string;
  imageUrl: string;
  title: string;
}

export const MusicHeader = () => {
  const params = useParams();
  const id = params.id as string;
  const [music, setMusic] = useState<Music | null>(null);
  const { deleteMusic: deleteMusicFunction, loading, error } = useDeleteMusic();

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/music/${id}`)
        .then((res) => res.json())
        .then((data) => setMusic(data))
        .catch((err) => console.error("Error fetching Repertoire:", err));
    }
  }, [id]);

  const handleBackButtonSubmit = () => {
    router.push("/home");
  };

  const handleDeleteMusic = async (id: string) => {
    if (!id) return;

    try {
      await deleteMusicFunction({ id });

      toast.success("Repertoire deleted successfully", {
        position: "bottom-right",
        duration: 1000,
      });
      console.log(deleteMusicFunction);
      router.push("/home");
    } catch (error) {
      toast.error(`Error deleting Repertoire ${error}`, {
        position: "bottom-right",
        duration: 1000,
      });
    }
  };

  if (!music) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <button onClick={handleBackButtonSubmit} className="bg-transparent">
            <IoArrowBackSharp size={34} color="#009DA2" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-transparent p-0"
            onClick={() => handleDeleteMusic(music.id)}
          >
            <IoTrash size={32} color="red" />
          </button>
          {loading && <p>Deleting...</p>}
          {error && <p>{error}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-16 items-center">
        <div className="relative w-24 h-24 border-white border-2 text-white flex items-center justify-center text-5xl">
          {music && music.imageUrl ? (
            <Image
              src={music.imageUrl}
              alt={music.title}
              fill
              className="object-cover"
            />
          ) : (
            ""
          )}
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">{music?.title}</h2>
      </div>
    </>
  );
};
