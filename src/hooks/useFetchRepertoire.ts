import { useEffect, useState } from "react";

interface Repertoire {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const useFetchRepertoires = () => {
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepertoires = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not logged in.");
        }

        const [leaderResponse, memberResponse] = await Promise.all([
          fetch(`http://localhost:8080/bands/leader/${userId}`),
          fetch(`http://localhost:8080/bands/member/${userId}`),
        ]);

        if (!leaderResponse.ok || !memberResponse.ok) {
          throw new Error("Error fetching bands.");
        }

        const [leaderBands, memberBands] = await Promise.all([
          leaderResponse.json(),
          memberResponse.json(),
        ]);

        const allBands = [...leaderBands, ...memberBands];
        const uniqueBands = allBands.filter(
          (band, index, self) =>
            index === self.findIndex((b) => b.id === band.id)
        );

        if (uniqueBands.length === 0) {
          setRepertoires([]);
          return;
        }

        const repertoireResponses = await Promise.all(
          uniqueBands.map((band) =>
            fetch(`http://localhost:8080/repertoire/band/${band.id}`)
          )
        );

        const failedResponse = repertoireResponses.find((res) => !res.ok);
        if (failedResponse) {
          throw new Error("Error fetching repertoires.");
        }

        const repertoireData = await Promise.all(
          repertoireResponses.map((res) => res.json())
        );

        const allRepertoires = repertoireData.flat();

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
