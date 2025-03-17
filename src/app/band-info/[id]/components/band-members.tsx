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
    const fetchData = async () => {
      try {
        const allUsers = await getAllUsers();
        console.log("All users:", allUsers);

        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No logged in users found!");
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentUser = allUsers.find((user: any) => user.id === userId);
        if (!currentUser) {
          console.error("Logged in user not found in user list!");
          return;
        }

        if (bandId) {
          console.log("Fetching band details for bandId:", bandId);

          const bandResponse = await fetch(
            `http://localhost:8080/bands/${bandId}`
          );
          const bandData = await bandResponse.json();
          console.log("Band data:", bandData);

          if (bandData.leader.id === currentUser.id) {
            setIsLeader(true);
          } else {
            setIsLeader(false);
          }

          const membersResponse = await fetch(
            `http://localhost:8080/user/${bandId}/members`
          );
          const membersData = await membersResponse.json();
          console.log("Band members:", membersData);

          setUsers(membersData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar os dados:", err);
      }
    };

    fetchData();
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

        {isLeader ? (
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
