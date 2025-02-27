import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

interface Repertoire {
  name: string;
  description: string;
  imageUrl: string;
}

export const RepertoireHeader = () => {
  const params = useParams();
  const id = params.id as string;
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);

  const router = useRouter();

  const handleBackButtonSubmit = () => {
    router.push("/home");
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/repertoire/${id}`)
        .then((res) => res.json())
        .then((data) => setRepertoire(data))
        .catch((err) => console.error("Error fetching Repertoire:", err));
    }
  }, [id]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <button onClick={handleBackButtonSubmit} className="bg-transparent">
          <IoArrowBackSharp size={34} color="#009DA2" />
        </button>
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
    </div>
  );
};
