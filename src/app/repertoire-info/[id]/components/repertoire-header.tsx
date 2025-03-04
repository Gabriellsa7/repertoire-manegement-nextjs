import { useDeleteRepertoire } from "@/hooks/useDeleteRepertoire";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoArrowBackSharp, IoTrash } from "react-icons/io5";

interface Repertoire {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const RepertoireHeader = () => {
  const params = useParams();
  const id = params.id as string;
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
  const {
    deleteRepertoire: deleteRepertoireFunction,
    loading,
    error,
  } = useDeleteRepertoire();

  const router = useRouter();

  const handleBackButtonSubmit = () => {
    router.push("/home");
  };

  const handleDeleteRepertoire = async (id: string) => {
    if (!id) return;
    try {
      await deleteRepertoireFunction({ id });

      toast.success("Repertoire deleted successfully", {
        position: "bottom-right",
        duration: 1000,
      });
      console.log(deleteRepertoireFunction);
      router.push("/home");
    } catch (error) {
      toast.error(`Error deleting Repertoire ${error}`, {
        position: "bottom-right",
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/repertoire/${id}`)
        .then((res) => res.json())
        .then((data) => setRepertoire(data))
        .catch((err) => console.error("Error fetching Repertoire:", err));
    }
  }, [id]);

  if (!repertoire) {
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
            onClick={() => handleDeleteRepertoire(repertoire.id)}
          >
            <IoTrash size={32} color="red" />
          </button>
          {loading && <p>Deleting...</p>}
          {error && <p>{error}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-16 items-center">
        <div className="w-24 h-24 border-white border-2 text-white rounded-full flex items-center justify-center text-5xl">
          {repertoire && repertoire ? (
            <Image
              src={repertoire.imageUrl}
              alt={repertoire.name}
              width={102}
              height={102}
            />
          ) : (
            ""
          )}
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {repertoire?.name}
        </h2>
      </div>
    </>
  );
};
