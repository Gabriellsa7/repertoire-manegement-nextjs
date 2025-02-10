import { useState } from "react";

interface Repertoire {
  name: string;
  imageUrl?: string;
  description: string;
}

interface UseCreateRepertoireResponse {
  createRepertoire: (
    repertoire: Repertoire
  ) => Promise<{ success: boolean; error: string | null }>;
  isLoading: boolean;
  error: string | null;
}

export const useCreateRepertoire = (): UseCreateRepertoireResponse => {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const createRepertoire = async ({
    name,
    imageUrl,
    description,
  }: Repertoire) => {
    const userId = localStorage.getItem("userId");
    const url = "http://localhost:8080/repertoire";

    if (!userId) {
      throw new Error("User ID is not found");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          imageUrl,
          description,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.text()) || "Failed to create the band.";
        throw new Error(errorMessage);
      }
      return { success: true, error: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "An unknown error occurred.",
      };
    }
  };

  return { createRepertoire, isLoading, error };
};
