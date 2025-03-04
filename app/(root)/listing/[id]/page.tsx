"use client";

import HeartBtn from "@/components/HeartBtn";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import MapComponent from "@/components/Map";
import { fetchPropertyById, Property } from "@/lib/data";
import SinglePropertySkeleton from "@/components/SinglePropertySkeleton"; 
import BookingBtn from "@/components/BookingBtn";

const SingleProperty: React.FC = () => {
  const { id } = useParams(); // Get dynamic route id
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; 

    const loadProperty = async () => {
      setLoading(true);
      try {
        const data = await fetchPropertyById(Number(id)); 
        setProperty(data);
      } catch {
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return <SinglePropertySkeleton />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }

  return (
    <section className="max-padd-container my-[99px]">
      {/* Single property card */}
      <div className="pb-2 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${property.image}`}
          alt={property.title}
          width={500}
          height={500}
          className="rounded-xl self-center w-full h-[600px] max-md:h-auto object-cover"
        />
        <div className="absolute top-6 right-8">
          {/* Like button */}
          <HeartBtn propertyId={property.id.toString()} />
        </div>
      </div>
      <div className="xl:flexBetween gap-8 px-8">
        <div className="flex-1">
          {/* Left side */}
          <h5 className="bold-16 my-1 text-zinc-300 capitalize">{property.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18 ">{property.title}</h4>
          </div>
          <p className="pt-2 mb-4 ">{property.description}</p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {property.address} {property.city} {property.country}
            </div>
          </div>
          <div className="flexBetween max-md:flex gap-y-3 flex-wrap-reverse">
           <BookingBtn propertyId={property.id.toString()} />
            <div className="bold-20">Tsh {property.price}</div>

          </div>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <MapComponent
            address={property.address}
            city={property.city}
            country={property.country}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProperty;