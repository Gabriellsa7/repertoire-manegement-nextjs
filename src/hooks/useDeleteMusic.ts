import { useState } from "react";
import toast from "react-hot-toast";

interface Music {
  id: string;
}

const useDeleteMusic = () => {
  const [music, setMusic] = useState<Music | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteMusic = async ({ id }: Music) => {
    try {
      const res = await fetch(`http://localhost:8080/music/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.error("Error Delete Repertoire", {
          duration: 3000,
        });
      }

      setMusic(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMusic, error, loading, music };
};

export default useDeleteMusic;
