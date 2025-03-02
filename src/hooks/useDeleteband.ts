import { useState } from "react";

interface Band {
  id: string;
}

export const useDeleteBand = () => {
  const [bands, setBand] = useState<Band | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteBand = async ({ id }: Band) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/bands/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Error Delete Band");
      }

      setBand(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return { deleteBand, loading, error, bands };
};
