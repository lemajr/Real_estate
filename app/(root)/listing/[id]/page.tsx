"use client";

import HeartBtn from "@/components/HeartBtn";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import MapComponent from "@/components/Map";
import { fetchPropertyById } from "@/lib/data";
import SinglePropertySkeleton from "@/components/SinglePropertySkeleton";
import BookingBtn from "@/components/BookingBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MediaItem {
  id: number;
  media_type: "image" | "video";
  file: string;
  uploaded_at: string;
}

interface Property {
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

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const getMediaUrl = (file: string, mediaType: "image" | "video") => {
  // Remove "auto/upload/" from the file path if it exists
  const cleanedFile = file.replace(/^auto\/upload\//, "");

  if (file.startsWith("http")) {
    // If the file is already a full URL, return it directly
    return file;
  }

  // Construct the Cloudinary URL
  return `${CLOUDINARY_BASE_URL}/${mediaType}/upload/${cleanedFile}`;
};

const SingleProperty: React.FC = () => {
  const { id } = useParams(); // Get dynamic route id
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null); // Use useRef for Swiper instance

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

  // Stop autoplay on mouse enter
  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  // Start autoplay on mouse leave
  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

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
      {/* Single property media slider */}
      <div className="pb-2 relative">
        {property.media && property.media.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign Swiper instance to ref
            onMouseEnter={handleMouseEnter} // Stop autoplay on hover
            onMouseLeave={handleMouseLeave} // Start autoplay on mouse leave
            className="w-full rounded-xl"
          >
            {property.media.map((mediaItem) => (
              <SwiperSlide key={mediaItem.id}>
                {mediaItem.media_type === "image" ? (
                  <Image
                    src={getMediaUrl(mediaItem.file, "image")}
                    alt={property.title}
                    width={500}
                    height={500}
                    className="rounded-xl self-center w-full h-[600px] max-md:h-auto object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.jpg"; // Fallback for broken images
                    }}
                  />
                ) : (
                  <video
                    src={getMediaUrl(mediaItem.file, "video")}
                    className="rounded-xl self-center w-full h-[600px] max-md:h-auto object-cover"
                    controls
                    muted
                    onError={(e) => {
                      e.currentTarget.style.display = "none"; // Hide broken videos
                    }}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
        <div className="absolute top-6 right-8 z-10">
          {/* Like button */}
          <HeartBtn propertyId={property.id.toString()} />
        </div>
      </div>
      <div className="xl:flexBetween gap-8 px-8">
        <div className="flex-1">
          {/* Left side */}
          <h5 className="bold-16 my-1 text-zinc-300 capitalize">{property.city}</h5>
          <div className="flexBetween">
            <h4 className="medium-18">{property.title}</h4>
          </div>
          <p className="pt-2 mb-4">{property.description}</p>
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