import { useEffect, useState } from "react";

interface Band {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  leader_id?: string;
}

export const useFetchBands = (userId: string | null) => {
  const [bands, setBands] = useState<Band[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("No user ID provided");
      setIsLoading(false);
      return;
    }

    const fetchBands = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/bands/member/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user bands");
        }

        const data = await response.json();
        setBands(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBands();
  }, [userId]);

  return { bands, isLoading, error };
};
