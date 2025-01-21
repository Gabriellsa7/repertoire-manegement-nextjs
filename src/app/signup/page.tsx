import Image from "next/image";
import Link from "next/link";

export const Signup = () => {
  return (
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
          />
        </div>
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
        <button className="bg-primaryButton py-3 rounded-xl hover:bg-buttonHoverColor mt-3">
          <span>Login</span>
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
  );
};

export default Signup;
