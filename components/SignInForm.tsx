"use client";

import { signIn, signOut, useSession } from "next-auth/react"; 
import Image from "next/image";
import userIcon from "@/public/assets/user.svg";
import { Button } from "./ui/button";
import { Loader } from "lucide-react"; 
import { lazy } from "react";

const SignInForm = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading"; 

  const avatarSize = session?.user?.image ? 32 : 22;

  return (
    <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-gray-900 p-1 px-4">
      {/* User Avatar or Default Icon */}
      <Image
        src={session?.user?.image || userIcon}
        alt="User Avatar"
        height={avatarSize}
        width={avatarSize}
        className="rounded-full shadow-md"
        loading="lazy"
      />

      {/* Loading Spinner */}
      {isLoading ? (
        <Loader className="h-5 w-5 animate-spin text-white" />
      ) : session ? (
        <Button
          onClick={() => signOut()}
          className="bg-red-500 px-4 text-white rounded-full hover:bg-red-600"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className="bg-blue-500 px-4 text-white rounded-full hover:bg-blue-600"
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default SignInForm;
