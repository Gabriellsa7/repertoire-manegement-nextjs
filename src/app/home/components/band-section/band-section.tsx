"use client";
import Image from "next/image";
import { ModalSection } from "./components/modal-section";
import { useFetchBands } from "@/hooks/useFetchBands";
import { useState } from "react";

const BandSection = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { bands } = useFetchBands(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex gap-3 items-center">
        {bands.length > 0
          ? bands.map((band) => (
              <div key={band.id} className="flex flex-col gap-2">
                <div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                  <Image
                    src="/assets/profile.png"
                    alt={band.name}
                    width={70}
                    height={70}
                  />
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
          className="flex bg-transparent pb-9 items-center"
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
