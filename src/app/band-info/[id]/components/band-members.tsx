"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Band {
  bandId: string;
}

export const BandMembers = ({ bandId }: Band) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {/* {bands.length > 0
              ? bands.map((band) => (
                  <div
                    key={band.id}
                    className="flex flex-col gap-2 min-w-[80px]"
                    onClick={() => router.push(`/band-info/${band.id}`)}
                  >
                    <div className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full">
                      {band.imageUrl && (
                        <Image
                          src={band.imageUrl}
                          alt={band.name}
                          width={70}
                          height={70}
                        />
                      )}
                    </div>
                    <div className="w-20">
                      <p className="text-lg font-bold text-center truncate text-primary-text-color">
                        {band.name}
                      </p>
                    </div>
                  </div>
                ))
              : ""} */}
        <button
          className="flex bg-transparent items-center min-w-[80px] pb-9"
          onClick={() => router.push(`/add-user/${bandId}`)}
        >
          <Image
            src="/assets/plus.png"
            alt="plus icon"
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
};
