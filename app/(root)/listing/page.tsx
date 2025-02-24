"use client";

import Item from "@/components/Item";
import Searchbar from "@/components/Searchbar";
import { fetchProperties, Property } from "@/lib/data";
import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import SkeletonCard from "@/components/SkeletonCard";

const Listing = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  // Fetch properties on component mount
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    loadProperties();
  }, [fetchProperties]);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    [setSearchQuery] 
  );

  // Filter properties based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties); 
    }
  }, [searchQuery, properties]);

  useEffect(() => {
    setFilteredProperties(filteredProperties);
  }, [filteredProperties]);
  
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-[#f8f9fa] rounded-3xl">
        <div>
          {/* Pass searchQuery and handleSearch to Searchbar */}
          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={handleSearch}
          />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10">
            {/* Show skeleton cards while loading */}
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : properties.length > 0 ? (
              <>
                {/* Show filtered properties */}
                {filteredProperties.map((property) => (
                  <Item key={property.id} property={property} />
                ))}
              </>
            ) : (
              <div className="text-center text-gray-600 py-4">
                No properties found.
              </div>
            )}
          </div>
          {/* Show message if no properties match the search query */}
          {!isLoading && searchQuery && filteredProperties.length === 0 && (
            <div className="text-center text-gray-600 py-4">
              No properties found matching your search.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Listing;