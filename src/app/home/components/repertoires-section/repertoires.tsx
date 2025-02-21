"use client";
import Image from "next/image";
import { ModalSection } from "./components/modal-section";
import { useFetchRepertoire } from "@/hooks/useFetchRepertoire";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Repertoires = () => {
  const router = useRouter();
  const { repertoires, error, loading } = useFetchRepertoire();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <p className="font-bold">Repertoires</p>
        <p className="text-xs text-secondaryTextColor">View More</p>
      </div>

      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : repertoires.length > 0 ? (
          repertoires.map((repertoire) => (
            <div
              className="flex flex-col gap-2 min-w-[80px]"
              key={repertoire.id}
              onClick={() => router.push(`/repertoire-info/${repertoire.id}`)}
            >
              <div className="flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden p-3"></div>
              <div className="w-16">
                <h3 className="text-lg font-bold truncate">
                  {repertoire.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p>No repertoires found.</p>
        )}

        {/* Add button */}
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
        </button>
      </div>
      <ModalSection
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Repertoires;
