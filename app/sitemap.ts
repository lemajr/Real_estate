import { fetchProperties } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await fetchProperties();

  return [
    {
      url: "https://www.blackwill.co.tz/",
      lastModified: new Date().toISOString(),
    },
    {
    url: "https://www.blackwill.co.tz/contact",
    lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.blackwill.co.tz/listing",
      lastModified: new Date().toISOString(),
    },  
    ...properties.map((property) => ({
      url: `https://www.blackwill.co.tz/listing/${property.id}`,
      lastModified: property.updated_at || new Date().toISOString(),
    })),
  ];

}