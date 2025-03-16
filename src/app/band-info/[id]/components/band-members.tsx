"use client";
import { getAllUsers } from "@/app/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Band {
  id?: string;
  name?: string;
  imageUrl?: string;
  leader?: {
    id: string;
    name: string;
    email: string;
  };
  bandId: string;
}

interface User {
  id: string;
  name: string;
  imageUrl: string;
}

export const BandMembers = ({ bandId }: Band) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLeader, setIsLeader] = useState<boolean>(false);

  useEffect(() => {
    const allUsers = getAllUsers();
    if (!allUsers.length) return;

    const currentUser = allUsers[0];

    if (bandId) {
      console.log("Fetching band details for bandId:", bandId);

      fetch(`http://localhost:8080/bands/${bandId}`)
        .then((res) => res.json())
        .then((bandData) => {
          console.log("Band data:", bandData);

          if (bandData.leader && bandData.leader.id === currentUser.id) {
            setIsLeader(true);
          } else {
            setIsLeader(false);
          }

          fetch(`http://localhost:8080/user/${bandId}/members`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Band members:", data);
              setUsers(data);
              setLoading(false);
            })
            .catch((err) => console.error("Error fetching members:", err));
        })
        .catch((err) => console.error("Error fetching band details:", err));
    }
  }, [bandId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-2 items-center overflow-x-auto w-full whitespace-nowrap scrollbar-hide">
        {users.length > 0
          ? users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-2 min-w-[80px] relative"
                onClick={() => router.push(`/user-info/${user.id}`)}
              >
                <div className="relative flex items-center text-5xl justify-center w-16 h-16 bg-gray-100 rounded-full">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <p className="text-black font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </p>
                  )}
                </div>
                <div className="w-20">
                  <p className="text-lg font-bold text-center truncate text-primary-text-color">
                    {user.name}
                  </p>
                </div>
              </div>
            ))
          : ""}

        {isLeader && (
          <button
            className="flex bg-transparent items-center min-w-[80px] pb-9"
            onClick={() => router.push(`/add-user/${bandId}`)}
          >
            <Image
              src="/assets/plus.png"
              alt="plus icon"
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
    </div>
  );
};
