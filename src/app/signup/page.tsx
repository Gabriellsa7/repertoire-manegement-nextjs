"use client";
import { useSignup } from "@/hooks/useSignup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Toaster, toast } from "react-hot-toast";

export const Signup = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUser } = useSignup();

  const handleSubmitSignup = async () => {
    try {
      const { success } = await createUser({ name, email, password });

      if (success) {
        toast.success("Signup in successfully!", {
          position: "top-right",
          duration: 2000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error signup in. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-7 min-h-screen justify-center">
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo" width={200} height={30} />
        </div>
        <div className="flex justify-center py-3">
          <span className="font-bold text-2xl">Join Us!</span>
        </div>
        <div className="flex flex-col px-7 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-lg">Name</span>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="px-5 py-2 rounded-lg outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-lg">Email</span>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="px-5 py-2 rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-lg">Password</span>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="px-5 py-2 rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmitSignup}
            className="bg-primaryButton py-3 rounded-xl hover:bg-buttonHoverColor mt-3"
          >
            <span>Signup</span>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-base">
            {/*I explicitly escape the whole block of text by enclosing the line in {" "}*/}
            {"Already have an account?"}
            <Link href="/login">
              <span className="text-secondaryTextColor underline">Login</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
