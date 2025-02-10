"use client";
import { useCreateRepertoire } from "@/hooks/useCreateRepertoire";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface ModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSection = ({ isOpen, onClose }: ModalSectionProps) => {
  const { createRepertoire } = useCreateRepertoire();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitCreateRepertoire = async () => {
    try {
      const { success } = await createRepertoire({
        name,
        imageUrl,
        description,
      });

      if (success) {
        toast.success("Band created successfully!", {
          position: "top-right",
          duration: 1000,
        });
        setName(""); // Clear input field after successful creation
        setImageUrl("");
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
            Create a New Repertoire
          </h2>
          <form>
            <label className="block mb-2 font-bold text-white">Name</label>
            <input
              type="text"
              placeholder="Enter Repertoire Name"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block mb-2 font-bold text-white">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter Repertoire Description"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block mb-2 font-bold text-white">
              Repertoire Image Url
            </label>
            <input
              type="text"
              placeholder="Enter Repertoire Image"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <button
              onClick={handleSubmitCreateRepertoire}
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Create Repertoire
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
