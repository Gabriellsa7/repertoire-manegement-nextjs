"use client";
import { useCreateBands } from "@/hooks/useCreateBand";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface ModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSection = ({ isOpen, onClose }: ModalSectionProps) => {
  const { createBand, error, isLoading } = useCreateBands();
  const [name, setName] = useState("");

  const handleSubmitCreateBand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { success } = await createBand({ name });

      if (success) {
        toast.success("Band created successfully!", {
          position: "top-right",
          duration: 1000,
        });
        setName(""); // Clear input field after successful creation
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating band. Please try again.", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <Toaster />
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-background p-6 rounded-lg w-[90%] max-w-sm shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-center mb-4">
            Create a New Band
          </h2>
          <form>
            <label className="block mb-2 font-bold text-white">Name</label>
            <input
              type="text"
              placeholder="Enter Band Name"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <button
              onClick={handleSubmitCreateBand}
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full"
            >
              {isLoading ? "Creating..." : "Create Band"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
