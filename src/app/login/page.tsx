"use client";
import { useLoginUser } from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginUser();

  const handleSubmitLogin = async () => {
    try {
      const { success, error } = await loginUser({ email, password });

      if (success) {
        toast.success("Logged in successfully!", {
          position: "top-right",
          duration: 2000,
        });
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        toast.error(error || "Invalid email or password", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging in. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-6 min-h-screen justify-center">
        <div className="flex justify-center">
          <Image src="/Logo.png" alt="Logo" width={200} height={30} />
        </div>
        <div className="flex justify-center py-6">
          <span className="font-bold text-2xl">Welcome Back!</span>
        </div>
        <div className="flex flex-col px-7 gap-8">
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
          <div className="flex justify-end">
            <span className="text-sm">Forgot your password?</span>
          </div>
          <button
            onClick={handleSubmitLogin}
            className="bg-primaryButton py-3 rounded-xl hover:bg-buttonHoverColor"
          >
            <span className="text-white font-bold text-base">Login</span>
          </button>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-base">
            {/*I explicitly escape the whole block of text by enclosing the line in {" "}*/}
            {"Don't have an account?"}
            <Link href="/signup">
              <span className="text-secondaryTextColor underline">Sign up</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
