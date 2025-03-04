import { useState } from "react";
import toast from "react-hot-toast";

interface Repertoire {
  id: string;
}

export const useDeleteRepertoire = () => {
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //delete
  const deleteRepertoire = async ({ id }: Repertoire) => {
    try {
      const res = await fetch(`http://localhost:8080/repertoire/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.error("Error Delete Repertoire", {
          duration: 3000,
        });
      }

      setRepertoire(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteRepertoire, loading, error, repertoire };
};
