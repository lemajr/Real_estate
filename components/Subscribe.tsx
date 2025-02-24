"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-sm p-2 border rounded-xl transition-all">
      <form className="flex items-center gap-2 max-md:flex-col max-md:gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email Address"
          className="w-full flex-1 bg-transparent border-none outline-none focus:ring-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          type="submit"
          className="rounded-full px-6 max-md:w-full"
          disabled={!email.trim()}
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default SubscribeForm;
