export interface MediaItem {
  id: number;
  media_type: "image" | "video";
  file: string;
  uploaded_at: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  country: string;
  media: MediaItem[];
  created_at: string;
  updated_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_END_POINT!;

console.log("API Base URL:", BASE_URL);

// Helper function to transform raw API data into Property type
const transformToProperty = (data: any): Property => {
  return {
    id: data.id || 0,
    title: data.title || "",
    description: data.description || "",
    price: data.price || "0",
    address: data.address || "",
    city: data.city || "",
    country: data.country || "",
    media: Array.isArray(data.media)
      ? data.media.map((item: any) => ({
          id: item.id || 0,
          media_type: item.media_type === "image" || item.media_type === "video" ? item.media_type : "image",
          file: item.file || "",
          uploaded_at: item.uploaded_at || "",
        }))
      : [],
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
  };
};

// Fetch all properties
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/properties/`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await response.json();
    return Array.isArray(data) ? data.map(transformToProperty) : [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

// Fetch a single property by ID
export const fetchPropertyById = async (id: number): Promise<Property | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/properties/${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID: ${id}`);
    }
    const data = await response.json();
    return transformToProperty(data);
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};