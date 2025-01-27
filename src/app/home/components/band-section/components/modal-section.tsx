import React from "react";

interface ModalSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSection = ({ isOpen, onClose }: ModalSectionProps) => {
  if (!isOpen) return null;
  return (
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
          />
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
