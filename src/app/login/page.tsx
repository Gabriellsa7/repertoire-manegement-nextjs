"use client";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
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
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold text-lg">Password</span>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="px-5 py-2 rounded-lg outline-none"
          />
        </div>
        <div className="flex justify-end">
          <span className="text-sm">Forgot your password?</span>
        </div>
        <button className="bg-primaryButton py-3 rounded-xl hover:bg-buttonHoverColor">
          <span>Login</span>
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
  );
};

export default Login;
