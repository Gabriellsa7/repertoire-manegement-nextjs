import { useState, useEffect } from "react";

// Interfaces
interface Music {
  id: string;
  title: string;
  imageUrl: string;
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

        const fetchData = async <T>(url: string): Promise<T> => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Error fetching from ${url}`);
          return response.json();
        };

        const [leaderBands, memberBands] = await Promise.all([
          fetchData<Band[]>(`http://localhost:8080/bands/leader/${userId}`),
          fetchData<Band[]>(`http://localhost:8080/bands/member/${userId}`),
        ]);

        const uniqueBands = [...leaderBands, ...memberBands].filter(
          (band, index, self) =>
            index === self.findIndex((b) => b.id === band.id)
        );

        if (uniqueBands.length === 0) {
          setMusics([]);
          return;
        }
        const repertoireResponses = await Promise.all(
          uniqueBands.map((band) =>
            fetchData<Repertoire[]>(
              `http://localhost:8080/repertoire/band/${band.id}`
            )
          )
        );

        const allRepertoires = repertoireResponses.flat();

        if (allRepertoires.length === 0) {
          setMusics([]);
          return;
        }

        const musicResponses = await Promise.all(
          allRepertoires.map((rep) =>
            fetchData<Music[]>(
              `http://localhost:8080/repertoire-music/${rep.id}/musics`
            )
          )
        );

        const allMusics = musicResponses.flat();
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
