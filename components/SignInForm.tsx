"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import userIcon from "@/public/assets/user.svg";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { saveVisitor } from "@/lib/actions";

const SignInForm = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const avatarSize = session?.user?.image ? 32 : 22;

  useEffect(() => {
    if (session?.user) {
      const saveVisitorData = async () => {
        const visitorData = {
          username: session?.user?.name,
          email: session?.user?.email,
        };

        const result = await saveVisitor(visitorData); 
        if (!result.success) {
          console.error("Failed to save visitor:", result.error);
        }
      };

      saveVisitorData();
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-gray-900 p-1 px-4">
        <Loader className="h-5 w-5 animate-spin text-white" />
      </div>
    );
  }

  const buttonClass = "px-4 text-white rounded-full";

  return (
    <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-gray-900 p-1 px-4">
      <Image
        src={session?.user?.image || userIcon}
        alt="User Avatar"
        height={avatarSize}
        width={avatarSize}
        className="rounded-full shadow-md"
        priority={!session?.user?.image}
      />

      {session ? (
        <Button
          onClick={() => signOut()}
          className={`bg-red-500 ${buttonClass}`}
          aria-label="Logout"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => signIn("google")}
          className={`bg-[#f4db7ebc] hover:bg-[#f4da7e98] ${buttonClass} `}
          aria-label="Login with Google"
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default SignInForm;