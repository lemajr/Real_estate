export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  country: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_END_POINT!;

console.log("API Base URL:", BASE_URL);

// Fetch all properties
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/properties/`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return await response.json();
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
    return await response.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};
