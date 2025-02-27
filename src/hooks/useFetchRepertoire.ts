import { useEffect, useState } from "react";

interface Repertoire {
  id: string;
  name: string;
  description: string;
  ImageUrl: string;
}

export const useFetchRepertoire = () => {
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
          `http://localhost:8080/bands/leader/${userId}`
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

  return { repertoires, loading, error };
};
