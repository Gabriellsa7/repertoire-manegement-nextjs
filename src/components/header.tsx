"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md";

export const Header = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieves the user ID stored in localStorage

    if (userId) {
      fetch(`http://localhost:8080/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserName(data.name); // Update username
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setUserName("Guest"); // Fallback in case of an error
        });
    } else {
      setUserName("Guest"); // Fallback if ID not found
    }
  }, []);

  const handleProfileButtonSubmit = () => {
    console.log("Navigating to profile...");
    router.push("/profile");
  };

  return (
    <div className="flex items-center justify-between px-4 py-5">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/headphones32x32.png"
          alt="headphone icon"
          width={32}
          height={32}
        />
        <span className="text-primary-text-color font-bold text-base">
          {userName || "Loading..."} {/* Show the name or a fallback */}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleProfileButtonSubmit} className="bg-transparent">
          <MdNotificationsNone size={32} color="#009DA2" />
        </button>
        <button onClick={handleProfileButtonSubmit} className="bg-transparent">
          <div className="w-11 h-11 bg-[#009DA2] text-white rounded-full flex items-center justify-center text-xl">
            {userName.charAt(0).toUpperCase()}
          </div>
        </button>
      </div>
    </div>
  );
};
