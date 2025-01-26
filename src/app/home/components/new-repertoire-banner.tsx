"use client";
import { useEffect, useState } from "react";

interface Repertoire {
  id: string;
  name: string;
  description: string;
}

const RepertoireBanner = () => {
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [
    {
      /*loading*/
    },
    setLoading,
  ] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirstRepertoire = async () => {
      try {
        setLoading(true);
        setError(null);

        //pick the userId in local storage
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not logged in.");
        }

        // Fetch bands where the user is the leader
        const bandsResponse = await fetch(
          `http://localhost:8080/bands/leader/${userId}`
        );
        if (!bandsResponse.ok) {
          throw new Error("Error fetching bands.");
        }
        const bandsData = await bandsResponse.json();

        // Assuming we list the repertories for the first band found
        if (bandsData.length === 0) {
          throw new Error("No bands found for this user.");
        }
        const bandId = bandsData[0].id; // Pick the first band

        // Fetch the repertoires for the selected band
        const repertoireResponse = await fetch(
          `http://localhost:8080/repertoire/band/${bandId}`
        );
        if (!repertoireResponse.ok) {
          throw new Error("Error fetching repertoires.");
        }
        const repertoireData = await repertoireResponse.json();

        setRepertoires(repertoireData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFirstRepertoire();
  }, []);
  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <div>
        <span className="font-bold">New Repertoire</span>
      </div>
      <div className="h-36 bg-white rounded-xl">
        {repertoires.length > 0 ? (
          repertoires.map((repertoire) => (
            <div className="p-3" key={repertoire.id}>
              <p className="text-black">{repertoire.name}</p>
              <p className="text-black">{repertoire.description}</p>
            </div>
          ))
        ) : (
          <div>{error}No Repertoires</div>
        )}
      </div>
    </div>
  );
};

export default RepertoireBanner;
