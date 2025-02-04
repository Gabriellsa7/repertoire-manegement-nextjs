"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

interface ModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSection = ({ isOpen, onClose }: ModalSectionProps) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
              placeholder="Enter Band Name"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block mb-2 font-bold text-white">
              Repertoire Image Url
            </label>
            <input
              type="text"
              placeholder="Enter Band Image"
              className="w-full p-3 outline-none rounded-lg mb-4 text-black"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <button
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
