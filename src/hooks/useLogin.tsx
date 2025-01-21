"use client";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

interface PropsLogin {
  email: string;
  password: string;
}

export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async ({ email, password }: PropsLogin) => {
    const url = "http://localhost:8080/auth/login";

    // Validation with Zod
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Validation failed.");
      return false;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 404) {
          setError(errorData.error.message || "Email not Found");
        }
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Response from server:", data);

      // Save the user ID (or other relevant data) to localStorage
      if (data.id) {
        localStorage.setItem("userId", data.id);
      } else {
        console.error("User ID not found in response");
      }

      setIsLoading(false);
      return true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "Error creating user.");
      return false;
    }
  };
  return { loginUser, isLoading, error };
};
