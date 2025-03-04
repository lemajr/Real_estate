"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { saveVisitor } from "@/lib/actions";
import userIcon from "@/public/assets/user.svg";

const SignInForm = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    const saveVisitorData = async () => {
      if (!session?.user) return;

      const visitorData = {
        username: session.user.name,
        email: session.user.email,
      };

      try {
        const result = await saveVisitor(visitorData);
        if (!result.success) {
          console.error("Failed to save visitor:", result.error);
        }
      } catch (error) {
        console.error("Error saving visitor data:", error);
      }
    };

    saveVisitorData();
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-gray-900 p-1 px-4">
        <LoaderIcon className="h-5 w-5 animate-spin text-white" />
      </div>
    );
  }

  const avatarSize = session?.user?.image ? 32 : 22;
  const baseButtonClass =
    "px-4 text-white rounded-full flex items-center gap-2";

  const buttonConfig = session
    ? {
        onClick: () => signOut(),
        className: `${baseButtonClass} bg-red-500 hover:bg-red-400`,
        text: "Logout",
        ariaLabel: "Logout",
      }
    : {
        onClick: () => signIn("google"),
        className: `${baseButtonClass} bg-[#f4db7ebc] hover:bg-[#f4da7e98]`,
        text: "Login",
        ariaLabel: "Login with Google",
      };

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

      <Button
        onClick={buttonConfig.onClick}
        className={buttonConfig.className}
        aria-label={buttonConfig.ariaLabel}
      >
        {isLoading && <LoaderIcon className="size-6 animate-spin" />}
        {buttonConfig.text}
      </Button>
    </div>
  );
};

export default SignInForm;