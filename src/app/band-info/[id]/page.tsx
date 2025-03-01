"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { BandMembers } from "./components/band-members";

interface Band {
  id: string;
  name: string;
  imageUrl: string;
  band_id: string;
}

interface Repertoire {
  id: string;
  name: string;
  band: Band | null;
}

export default function BandInfo() {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();

  const handleBackButtonSubmit = () => {
    router.push("/home");
  };

  const [band, setBand] = useState<Band | null>(null);
  const [repertoireBand, setRepertoireBand] = useState<Repertoire[]>([]);
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);
  const [selectedRepertoires, setSelectedRepertoires] = useState<string[]>([]);

  // Fetch band details
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/bands/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched band data:", data); // Debugging
          setBand(data);
        })
        .catch((err) => console.error("Error fetching band:", err));
    }
  }, [id]);

  // Fetch available repertoires
  useEffect(() => {
    fetch("http://localhost:8080/repertoire")
      .then((res) => res.json())
      .then((data: Repertoire[]) => {
        console.log(data);

        const unassignedRepertoires = data.filter(
          (repertoire) => repertoire.band === null
        );
        console.log("Unassigned Repertoires:", unassignedRepertoires);

        setRepertoires(unassignedRepertoires);
      })
      .catch((err) => console.error("Error fetching repertoires:", err));
  }, []);
  //Fetch Repertoire By Band ID
  useEffect(() => {
    if (band?.id) {
      fetch(`http://localhost:8080/repertoire/band/${band.id}`)
        .then((res) => {
          console.log("Response Status:", res.status);
          if (!res.ok) {
            return res.text().then((errorText) => {
              throw new Error(`Error: ${res.status} - ${errorText}`);
            });
          }
          return res.json();
        })
        .then((data: Repertoire[]) => setRepertoireBand(data))
        .catch((err) => console.error("Error Fetch Repertoire:", err.message));
    }
  }, [band?.id]);

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

      location.reload();
    }

    toast.success("repertoire added successfully", {
      position: "bottom-right",
      duration: 1000,
    });
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
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-950 text-white m-4">
        <div className="flex items-center justify-between">
          <button onClick={handleBackButtonSubmit} className="bg-transparent">
            <IoArrowBackSharp size={34} color="#009DA2" />
          </button>
        </div>
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-4 px-16 items-center">
            <div className="w-24 h-24 border-white border-2 text-white rounded-full flex items-center justify-center text-5xl">
              {band.imageUrl && (
                <Image
                  src={band.imageUrl}
                  alt={band.name}
                  width={102}
                  height={102}
                />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">{band.name}</h2>
          </div>
          <div>Members</div>
          <BandMembers bandId={id} />
          <div>
            <span className="text-lg font-bold">Band Repertoire</span>
          </div>
          <div className="flex gap-3 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
            {repertoireBand &&
              repertoireBand.map((repertoire) => (
                <div
                  className="flex flex-col gap-2 min-w-[80px]"
                  key={repertoire.id}
                  onClick={() =>
                    router.push(`/repertoire-info/${repertoire.id}`)
                  }
                >
                  <div className="flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-xl overflow-hidden p-3"></div>
                  <div className="w-16">
                    <h3 className="text-lg font-bold truncate">
                      {repertoire.name}
                    </h3>
                  </div>
                </div>
              ))}

            {/* Add button
                <button
                  className="pb-9 min-w-[80px]"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src="/assets/plus2.png"
                    alt="plus icon"
                    width={32}
                    height={32}
                  />
                </button> */}
          </div>

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
    </>
  );
}
