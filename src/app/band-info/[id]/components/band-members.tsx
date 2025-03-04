"use client";

import { getLoggedUsers } from "@/app/utils/auth";
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
  image_url: string;
}

export const BandMembers = ({ bandId }: Band) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLeader, setIsLeader] = useState<boolean>(false);

  useEffect(() => {
    const loggedUsers = getLoggedUsers();
    if (!loggedUsers.length) return;

    const currentUser = loggedUsers[0];

    if (bandId) {
      console.log("Fetching band details for bandId:", bandId);
      fetch(`http://localhost:8080/bands/${bandId}`)
        .then((res) => res.json())
        .then((bandData) => {
          console.log("Band data:", bandData);

          if (bandData.leader.id === currentUser.id) {
            setIsLeader(true);
          } else {
            setIsLeader(false);
          }
        })
        .catch((err) => console.error("Error fetching band details:", err));

      fetch(`http://localhost:8080/user/${bandId}/members`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Band members:", data);
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching members:", err));
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
                <div className="flex items-center text-5xl justify-center w-16 h-16 bg-gray-100 rounded-full">
                  {/* {user.image_url && (
                    <Image
                      src={user.image_url}
                      alt={user.name}
                      width={70}
                      height={70}
                    />
                  )} */}

                  <p className="text-black font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </p>
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
