"use client";
import { useState, useEffect } from "react";

interface Band {
  id: string;
  name: string;
}

interface Repertoire {
  id: string;
  name: string;
}

export default function AddRepertoire() {
  const [bands, setBands] = useState<Band[]>([]);
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [bandId, setBandId] = useState<string>("");
  const [selectedRepertoires, setSelectedRepertoires] = useState<string[]>([]);

  // Fetch available bands
  useEffect(() => {
    fetch("http://localhost:8080/bands")
      .then((res) => res.json())
      .then((data) => setBands(data))
      .catch((err) => console.error("Error fetching bands:", err));
  }, []);

  // Fetch available repertoires
  useEffect(() => {
    fetch("http://localhost:8080/repertoire")
      .then((res) => res.json())
      .then((data) => setRepertoires(data))
      .catch((err) => console.error("Error fetching repertoires:", err));
  }, []);

  // Add repertoires to band
  const addRepertoires = async () => {
    if (!bandId || selectedRepertoires.length === 0) {
      alert("Please select a band and at least one repertoire!");
      return;
    }

    for (const repId of selectedRepertoires) {
      await fetch(
        `http://localhost:8080/repertoire/${repId}/assign-band/${bandId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    alert("Repertoires added successfully!");
  };

  // Update selected repertoires
  const handleRepertoireChange = (repId: string) => {
    setSelectedRepertoires((prev) =>
      prev.includes(repId)
        ? prev.filter((id) => id !== repId)
        : [...prev, repId]
    );
  };

  return (
    <div>
      <h2>Add Repertoire to a Band</h2>

      {/* Select Band */}
      <label>Select a band:</label>
      <select value={bandId} onChange={(e) => setBandId(e.target.value)}>
        <option value="">Select</option>
        {bands.map((band) => (
          <option key={band.id} value={band.id}>
            {band.name}
          </option>
        ))}
      </select>

      {/* List of Repertoires */}
      <h3>Select Repertoires:</h3>
      {repertoires &&
        repertoires.map((repertoire) => (
          <div key={repertoire.id}>
            <input
              type="checkbox"
              value={repertoire.id}
              onChange={() => handleRepertoireChange(repertoire.id)}
            />
            {repertoire.name}
          </div>
        ))}

      {/* Button to add repertoires to band */}
      <button onClick={addRepertoires}>Add Repertoires</button>
    </div>
  );
}
