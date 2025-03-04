"use client";

import { Button } from "@/components/ui/button";
import { saveSubscriber } from "@/lib/actions";
import { Loader, UserRoundPlus } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email.trim() || !/^[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        toast.warning("Please enter a valid email address");
        return;
      }

      try {
        setLoading(true);
        const response = await saveSubscriber({ email });
      
        if (response.success) {
          toast.success(response.message?.text);
          setEmail(""); // Clear input after success
        } else {
          toast.error(response.error || "Failed to subscribe. Please try again.");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <div className="w-full max-w-sm p-2 border rounded-xl transition-all">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 max-md:flex-col max-md:gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email Address"
          className="w-full flex-1 bg-transparent border-none outline-none focus:ring-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {loading ? (
          <div className="bg-black rounded-full p-1 px-6">
            <Loader className="h-5 w-5 animate-spin text-white " />
          </div>
        ) : (
          <Button
            type="submit"
            className="rounded-full px-6 max-md:w-full flex items-center justify-center"
            disabled={!email.trim()}
          >     <UserRoundPlus /> Submit</Button>
        )}
      </form>
    </div>
  );
};

export default SubscribeForm;
