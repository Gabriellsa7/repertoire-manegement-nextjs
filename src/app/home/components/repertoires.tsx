"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Repertoire {
  id: string;
  name: string;
  description: string;
}

const Repertoires = () => {
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error handling

  useEffect(() => {
    const fetchRepertoires = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the userId from localStorage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not logged in.");
        }

        // Fetch all bands where the user is a leader (or member)
        const bandsResponse = await fetch(
          `http://localhost:8080/bands/leader/${userId}` // Use this endpoint to fetch all bands the user is a member of
          //try make the code bellow work, probably I need change the back
          //`http://localhost:8080/bands/member/${userId}`
        );
        if (!bandsResponse.ok) {
          throw new Error("Error fetching bands.");
        }
        const bandsData = await bandsResponse.json();

        // Check if there are any bands
        if (bandsData.length === 0) {
          throw new Error("No bands found for this user.");
        }

        // Fetch repertoires for all bands
        const allRepertoires = [];
        for (const band of bandsData) {
          const repertoireResponse = await fetch(
            `http://localhost:8080/repertoire/band/${band.id}`
          );
          if (!repertoireResponse.ok) {
            throw new Error(
              `Error fetching repertoires for band with ID ${band.id}.`
            );
          }
          const repertoireData = await repertoireResponse.json();
          allRepertoires.push(...repertoireData);
        }

        setRepertoires(allRepertoires);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepertoires();
  }, []);

  return (
    <div className="flex flex-col px-4 py-5 gap-6">
      <div className="flex items-center justify-between">
        <p className="font-bold">Repertoires</p>
        <p className="text-xs text-secondaryTextColor">View More</p>
      </div>

      <div className="flex gap-5 flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : repertoires.length > 0 ? (
          repertoires.map((repertoire) => (
            <div className="flex flex-col gap-2" key={repertoire.id}>
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
        <button className="pb-9">
          <Image
            src="/assets/plus2.png"
            alt="plus icon"
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
};

export default Repertoires;
