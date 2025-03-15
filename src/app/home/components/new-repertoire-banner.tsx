"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Repertoire {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
}

const RepertoireBanner = () => {
  const [latestRepertoire, setLatestRepertoire] = useState<Repertoire | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestRepertoire = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/repertoire/latest",
          {
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error("No repertoire found");
        }
        const data = await response.json();
        setLatestRepertoire(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(`No repertoire found.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRepertoire();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <div>
        <span className="font-bold">New Repertoire</span>
      </div>
      <div className="relative h-36 bg-white rounded-xl overflow-hidden">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : latestRepertoire ? (
          latestRepertoire.imageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={latestRepertoire.imageUrl}
                alt="Repertoire Image"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-black">{latestRepertoire.name}</p>
              <p className="text-black">{latestRepertoire.description}</p>
            </div>
          )
        ) : (
          <p>No Repertoires</p>
        )}
      </div>
    </div>
  );
};

export default RepertoireBanner;
