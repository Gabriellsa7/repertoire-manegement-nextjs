import { useState } from "react";

interface AddMemberResponse {
  success: boolean;
  error: string | null;
}

export const useAddMember = (bandId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = async (userId: string): Promise<AddMemberResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/bands/${bandId}/add-member/${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add member to the band");
      }

      return { success: true, error: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      return {
        success: false,
        error: err.message || "An unknown error occurred.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { addMember, isLoading, error };
};
