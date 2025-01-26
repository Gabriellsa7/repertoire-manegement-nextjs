"use client";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const ProfileHeader = () => {
  const router = useRouter();

  const handleBackButtonSubmit = () => {
    router.push("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");

    toast.success("Logout successful!", {
      position: "bottom-right",
      duration: 1000,
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-between p-4">
        <button onClick={handleBackButtonSubmit} className="bg-transparent">
          <IoArrowBackSharp size={34} color="#009DA2" />
        </button>
        <button onClick={handleLogout} className="bg-transparent">
          <FiLogOut size={34} color="#FF2525" />
        </button>
      </div>
    </>
  );
};
