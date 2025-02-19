"use client";
import Image from "next/image";
import { ModalSection } from "./components/modal-section";
import { useFetchBands } from "@/hooks/useFetchBands";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BandSection = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { bands } = useFetchBands(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmitBandInfo = () => {
    router.push(`/band-info`);
  };

  return (
    <div className="relative flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <span className="text-primary-text-color font-bold text-base">
          Bands
        </span>
        <button className="bg-transparent">
          <span className="text-secondaryTextColor text-xs">View More</span>
        </button>
      </div>
      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {bands.length > 0
          ? bands.map((band) => (
              <div key={band.id} className="flex flex-col gap-2 min-w-[80px]">
                <div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full">
                  {band.imageUrl && (
                    <button onClick={handleSubmitBandInfo}>
                      <Image
                        src={band.imageUrl}
                        alt={band.name}
                        width={70}
                        height={70}
                      />
                    </button>
                  )}
                </div>
                <div className="w-20">
                  <p className="text-lg font-bold text-center truncate text-primary-text-color">
                    {band.name}
                  </p>
                </div>
              </div>
            ))
          : ""}
        <button
          className="flex bg-transparent items-center min-w-[80px] pb-9"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src="/assets/plus.png"
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

export default BandSection;
