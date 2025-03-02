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
      return { success: false, error: result.error.errors[0]?.message };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.message || "Invalid credentials";

        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      localStorage.setItem(`user_${data.id}`, JSON.stringify(data));

      setIsLoading(false);
      return { success: true, error: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "Error logging in.");
      return { success: false, error: error.message };
    }
  };
  return { loginUser, isLoading, error };
};
