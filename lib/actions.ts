"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  await signIn("google");
}

interface LikeData {
  visitorId: string;
  propertyId: string;
}


interface VisitorData {
  username: string | null | undefined;
  email: string | null | undefined;
}

interface SubscriberData {
  email: string | null | undefined;
}

interface ContactData {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    message: string;
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
        return { success: false, error: "You are already subscribed!" };
      }

      return { success: false, error: "Subscription failed. Please check your details and try again." };
    }

    return { success: true, message: { text: "Thank you for subscribing!" } };
  } catch (error) {
    console.error("Error sending subscription data:", error);
    return { success: false, error: "A network error occurred. Please try again later." };
  }
};


export const getInToTouch = async (contactData: ContactData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/intouchmessages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: contactData.fname,
        last_name: contactData.lname,
        phone_number: contactData.phone,
        email: contactData.email,
        message: contactData.message,
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("API Response:", data); // Debugging API response
      return {
        success: false,
        status: { status: response.status || 400 },
        message: { text: data?.error || "Something went wrong." },
      };
    }

    return {
      success: true,
      status: { status: response.status || 200 },
      message: { text: "Your message has been received. We will contact you soon!" },
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      status: { status: 500 },
      message: { text: "Network error. Please try again." },
    };
  }
};


export const getUserIdByEmail = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/visitors/?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    

    if (!response.ok) {
      console.error('API Response:', data);
      return null;
    }

    // Handle array response
    let id;
    if (Array.isArray(data)) {
      if (data.length === 0) {
        console.log(`No visitor found for email: ${email}`);
        return null;
      }
      id = data[0].id; 
    } else {
      id = data.id; 
    }


    // Expecting a single visitor object or null
    if (!data || !id) {
      console.log(`No visitor found for email: ${email}`);
      return null;
    }

    console.log(`Found visitor for ${email}:`, data);
    return { visitor_id: id }; 
  } catch (error) {
    console.error('Error fetching visitor ID:', error);
    return null;
  }
};


export const checkLikeStatus = async (visitorId: string, propertyId: string): Promise<boolean> => {
  try {

    const BASE_END_POINT_LOCAL = process.env.BASE_END_POINT_LOCAL!;
    console.log('visitorId:',visitorId);
    console.log('propertyId:',propertyId);
    const response = await fetch(`${BASE_END_POINT_LOCAL}/api/likes/status/?visitor=${visitorId}&property=${propertyId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    const data = await response.json();

    return response.ok ? data : false;
  } catch (error) {
    console.error('Error checking like status:', error);
    return false;
  }
};

export const saveLike = async (likeData: LikeData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/likes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor: likeData.visitorId,
        property: likeData.propertyId,
      }),
      credentials: 'include',
    });

    const data = await response.json();
    return response.ok ? { success: true, data } : { success: false, error: data.error || 'Failed to like' };
  } catch (error) {
    console.error('Error saving like:', error);
    return { success: false, error: 'Something went wrong' };
  }
};

export const removeLike = async (likeData: LikeData) => {
  try {
    const BASE_END_POINT_LOCAL = process.env.BASE_END_POINT_LOCAL!;

    const response = await fetch(`${BASE_END_POINT_LOCAL}/api/likes/unlike/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor: likeData.visitorId,
        property: likeData.propertyId,
      }),
      credentials: 'include',
    });

    const data = await response.json();
    return response.ok ? { success: true } : { success: false, error: data.error || 'Failed to unlike' };
  } catch (error) {
    console.error('Error removing like:', error);
    return { success: false, error: 'Something went wrong' };
  }
};

