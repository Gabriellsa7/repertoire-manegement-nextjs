import { useState, useEffect } from "react";

// Interfaces
interface Music {
  id: string;
  title: string;
}

interface Repertoire {
  id: string;
  name: string;
}

interface Band {
  id: string;
  name: string;
}

export const useFetchMusics = () => {
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in.");

        // Fetch bands
        const fetchData = async <T>(
          url: string,
          errorMessage: string
        ): Promise<T> => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(errorMessage);
          return response.json();
        };

        const bands = await fetchData<Band[]>(
          `http://localhost:8080/bands/leader/${userId}`,
          "Error fetching bands."
        );

        if (bands.length === 0)
          throw new Error("No bands found for this user.");

        const allMusics: Music[] = [];

        // Fetch repertoires and musics for each band
        for (const band of bands) {
          const repertoires = await fetchData<Repertoire[]>(
            `http://localhost:8080/repertoire/band/${band.id}`,
            `Error fetching repertoires for band ${band.id}.`
          );

          for (const repertoire of repertoires) {
            const musics = await fetchData<Music[]>(
              `http://localhost:8080/repertoire-music/${repertoire.id}/musics`,
              `Error fetching musics for repertoire ${repertoire.id}.`
            );
            allMusics.push(...musics);
          }
        }

        setMusics(allMusics);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusics();
  }, []);

  return { musics, loading, error };
};
