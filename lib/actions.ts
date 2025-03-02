"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  await signIn("google");
}


interface VisitorData {
  username: string | null | undefined;
  email: string | null | undefined;
}

interface SubscriberData {
  email: string | null | undefined;
}

const BASE_URL = process.env.BASE_END_POINT!;

export const saveVisitor = async (visitorData: VisitorData) => {

  try {
    const response = await fetch(`${BASE_URL}/api/visitors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle duplicate email gracefully
      if (data?.email?.[0] === "visitor with this email already exists.") {
        console.log("Visitor already exists, skipping...");
        return { success: true, message: "Visitor already exists" };
      }

      console.error("Failed to save visitor:", data);
      return { success: false, error: data };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending visitor data:", error);
    return { success: false, error: "An error occurred while saving visitor data." };
  }
};

export const saveSubscriber = async (subscriberData: SubscriberData) => {
  
  try {
    const response = await fetch(`${BASE_URL}/api/subscribers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriberData),
      credentials: "include", 
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("API Response:", data); // Debugging API response

      if (data?.email?.[0]?.toLowerCase().includes("already subscribe")) {
        return { success: false, message: "You are already subscribed!" };
      }

      return { success: false, error: data };
    }

    return { success: true, message: "Subscription successful!" };
  } catch (error) {
    console.error("Error sending subscription data:", error);
    return { success: false, error: "An error occurred while saving subscription data." };
  }
};
