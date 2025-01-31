"use client";

import Item from "@/components/Item";
import Searchbar from "@/components/Searchbar";
import { fetchProperties, Property } from "@/lib/data";
import React, { useEffect, useState } from "react";

const Listing = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };

    loadProperties();
  }, []);

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-[#f8f9fa] rounded-3xl">
        <div>
          <Searchbar />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10">
            {properties.map((property) => (
              <Item key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listing;
