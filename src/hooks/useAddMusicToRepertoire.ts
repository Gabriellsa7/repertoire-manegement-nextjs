import { useState } from "react";

interface PropsMusic {
  idRepertoire: string;
  idMusic: string;
  order: number;
}

export const useAddMusicToRepertoire = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMusicToRepertoire = async ({
    idRepertoire,
    idMusic,
    order,
  }: PropsMusic) => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in.");

      const url = `http://localhost:8080/repertoire-music/${idRepertoire}/add-music/${idMusic}?order=${order}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Requester-Id": userId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add music to repertoire.");
      }

      return { success: true, error: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unknown error occurred.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { addMusicToRepertoire, isLoading, error };
};
