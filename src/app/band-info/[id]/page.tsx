"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Band {
  id: string;
  name: string;
}

interface Repertoire {
  id: string;
  name: string;
  bandId: string | null;
}

export default function AddRepertoire() {
  const params = useParams();
  const id = params.id as string;

  const [band, setBand] = useState<Band | null>(null);
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [selectedRepertoires, setSelectedRepertoires] = useState<string[]>([]);

  // Fetch band details
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/bands/${id}`)
        .then((res) => res.json())
        .then((data) => setBand(data))
        .catch((err) => console.error("Error fetching band:", err));
    }
  }, [id]);

  // Fetch available repertoires
  useEffect(() => {
    fetch("http://localhost:8080/repertoire")
      .then((res) => res.json())
      .then((data: Repertoire[]) => {
        const unassignedRepertoires = data.filter(
          (repertoire) => !repertoire.bandId || repertoire.bandId === null
        );

        setRepertoires(unassignedRepertoires);
      })
      .catch((err) => console.error("Error fetching repertoires:", err));
  }, []);

  // Add repertoires to the band
  const addRepertoires = async () => {
    if (!id || selectedRepertoires.length === 0) {
      alert("Please select at least one repertoire!");
      return;
    }

    for (const repId of selectedRepertoires) {
      await fetch(
        `http://localhost:8080/repertoire/${repId}/assign-band/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    alert("Repertoires added successfully!");
  };

  // Handle repertoire selection
  const handleRepertoireChange = (repId: string) => {
    setSelectedRepertoires((prev) =>
      prev.includes(repId)
        ? prev.filter((id) => id !== repId)
        : [...prev, repId]
    );
  };

  if (!band) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-950 p-4 text-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Add Repertoire to {band.name}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-4">Select Repertoires:</h3>
            {repertoires.length === 0 ? (
              <p className="text-gray-400">No available repertoires.</p>
            ) : (
              <div className="space-y-3">
                {repertoires.map((repertoire) => (
                  <div
                    key={repertoire.id}
                    className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={repertoire.id}
                      onChange={() => handleRepertoireChange(repertoire.id)}
                      className="mr-2 accent-teal-600"
                    />
                    <span className="text-white">{repertoire.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {repertoires.length > 0 && (
            <button
              onClick={addRepertoires}
              className="w-full p-2 bg-teal-600 rounded hover:bg-teal-700 text-white"
            >
              Add Repertoires
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
