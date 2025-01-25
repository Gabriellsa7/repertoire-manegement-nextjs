"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center h-screen gap-4 bg-background px-6 overflow-y-hidden">
      <div className="flex flex-col items-center pb-7">
        <Image src="/Logo.png" alt="Logo" width={200} height={30} />
      </div>
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <button
            onClick={() => router.push("/login")}
            className="bg-primaryButton py-4 rounded-xl hover:bg-buttonHoverColor"
          >
            <span>Access Your Account</span>
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-primaryButton py-4 rounded-xl hover:bg-buttonHoverColor"
          >
            <span>Create an Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
