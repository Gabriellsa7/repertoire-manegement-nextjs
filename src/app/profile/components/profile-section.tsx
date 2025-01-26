"use client";
import { useEffect, useState } from "react";

export const ProfileSection = () => {
  const [userName, setUserName] = useState("");

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
  return (
    <div className="flex flex-col gap-4 px-16 items-center">
      <div className="w-24 h-24 bg-[#009DA2] text-white rounded-full flex items-center justify-center text-5xl">
        {userName.charAt(0).toUpperCase()}
      </div>
      <span className="text-primary-text-color font-bold text-xl">
        {userName || "Loading..."} {/* Show the name or a fallback */}
      </span>
    </div>
  );
};

export default ProfileSection;
