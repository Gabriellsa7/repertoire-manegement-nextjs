"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Band {
  id: string;
  name: string;
  description: string;
}

const BandSection = () => {
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    // Fetch bands associated with the user
    fetch(`http://localhost:8080/bands/leader/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching user bands");
        }
        return response.json();
      })
      .then((data) => setBands(data))
      .catch((error) => console.error(error.message));
  }, []);
  return (
    <div className="flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <span className="text-primary-text-color font-bold text-base">
          Bands
        </span>
        <button className="bg-transparent">
          <span className="text-secondaryTextColor text-xs">View More</span>
        </button>
      </div>
      {/* <div className="flex gap-3 items-center">
        {bands.length > 0
          ? bands.map((band) => (
              <div key={band.id} className="p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-bold truncate">{band.name}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {band.description}
                </p>
              </div>
            ))
          : ""}
        <button>
          <img src="../../../assets/plus.png" alt="" />
        </button>
      </div> */}
      <div className="flex gap-3 items-center">
        {bands.length > 0
          ? bands.map((band) => (
              <div key={band.id} className="flex flex-col gap-2">
                <div
                  key={band.id}
                  className="flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full overflow-hidden"
                >
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
        <button className="flex bg-transparent pb-9 items-center">
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

export default BandSection;
