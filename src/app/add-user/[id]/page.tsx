"use client";
import { useFetchUsers } from "@/hooks/listUser";
import { useAddMember } from "@/hooks/useAddUser";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const AddUser = () => {
  const params = useParams();
  const bandId = params.id as string;
  const {
    users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useFetchUsers();
  const {
    addMember,
    isLoading: isAddMemberLoading,
    error: addMemberError,
  } = useAddMember(bandId); // Passing bandId as a parameter
  const [selectedUserId, setSelectedUserId] = useState<Set<string>>(new Set());

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId.size === 0) {
      toast.error("Please select at least one user to add.", {
        position: "top-right",
        duration: 1000,
      });
      return;
    }

    try {
      for (const userId of selectedUserId) {
        const { success } = await addMember(userId);

        if (success) {
          toast.success("Member added successfully!", {
            position: "top-right",
            duration: 1000,
          });
        }
      }

      setSelectedUserId(new Set());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Error adding member. Please try again.", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Toaster />

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Add Member to Band</h1>
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium text-gray-700"
            >
              Select Users to Add
            </label>
            {isUsersLoading ? (
              <p>Loading users...</p>
            ) : usersError ? (
              <p className="text-red-500">{usersError}</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={user.id}
                      onChange={() =>
                        setSelectedUserId((prev) => {
                          const newSelectedUserId = new Set(prev);
                          if (newSelectedUserId.has(user.id)) {
                            newSelectedUserId.delete(user.id);
                          } else {
                            newSelectedUserId.add(user.id);
                          }
                          return newSelectedUserId;
                        })
                      }
                      className="mr-2 accent-teal-600"
                    />
                    <span className="text-white">{user.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {addMemberError && (
            <p className="text-red-500 text-sm">{addMemberError}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isAddMemberLoading}
              className="w-full py-2 px-4 border border-transparent text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {isAddMemberLoading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
