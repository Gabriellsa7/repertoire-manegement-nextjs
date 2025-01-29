import { useState } from "react";

interface Band {
  name: string;
  imageUrl?: string;
}

interface UseCreateBandsResponse {
  createBand: (
    band: Band
  ) => Promise<{ success: boolean; error: string | null }>;
  isLoading: boolean;
  error: string | null;
}

export const useCreateBands = (): UseCreateBandsResponse => {
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const createBand = async ({ name, imageUrl }: Band) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return {
        success: false,
        error: "User is not logged in or user ID is missing.",
      };
    }

    try {
      const response = await fetch("http://localhost:8080/bands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          imageUrl: imageUrl,
          leaderId: userId, // Ensure this is a simple string and not an object
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

  return { createBand, isLoading, error };
};
