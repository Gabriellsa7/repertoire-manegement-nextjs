import { useState } from "react";

interface PropsRepertoire {
  idRepertoire: string;
  idBand: string;
}

export const UseAddRepertoireToBand = () => {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const addRepertoireToBand = async ({
    idBand,
    idRepertoire,
  }: PropsRepertoire) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in.");

      const url = `http://localhost:8080/repertoire/${idRepertoire}/assign-band/${idBand}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idRepertoire }),
      });

      if (!response.ok) throw new Error("Failed to add repertoire to band.");

      return { success: true, error: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "An unknown error occurred.",
      };
    }
  };

  return { addRepertoireToBand, isLoading, error };
};
