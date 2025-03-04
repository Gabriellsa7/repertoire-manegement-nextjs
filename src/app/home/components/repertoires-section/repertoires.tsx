"use client";
import Image from "next/image";
import { ModalSection } from "./components/modal-section";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchRepertoires } from "@/hooks/useFetchRepertoire";

const Repertoires = () => {
  const router = useRouter();
  const { repertoires, error, loading } = useFetchRepertoires();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <p className="font-bold">Repertoires</p>
        <p className="text-xs text-secondaryTextColor">View More</p>
      </div>

      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && repertoires.length > 0
          ? repertoires.map((repertoire) => (
              <div
                className="flex flex-col gap-2 min-w-[80px] cursor-pointer"
                key={repertoire.id}
                onClick={() => router.push(`/repertoire-info/${repertoire.id}`)}
              >
                <div className="flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden p-3">
                  {repertoire.imageUrl ? (
                    <Image
                      src={repertoire.imageUrl}
                      alt={repertoire.name}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                  )}
                </div>
                <div className="w-16">
                  <h3 className="text-lg font-bold truncate">
                    {repertoire.name}
                  </h3>
                </div>
              </div>
            ))
          : !loading && !error && <p>No repertoires found.</p>}
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
