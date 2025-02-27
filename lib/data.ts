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
  
  
  const API_URL = "https://estate-back-end.vercel.app/api/properties/";

  
  export const fetchProperties = async (): Promise<Property[]> => {
    
    try {
      const response = await fetch(API_URL);
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
    export const fetchPropertyById = async (id: number): Promise<Property> => {
        try {
          const response = await fetch(`${API_URL}${id}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch property");
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching property:", error);
          throw error;
        }
      };