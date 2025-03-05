"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeartBtn from "./HeartBtn";
import Link from "next/link";
import { MapPinHouse } from "lucide-react";
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
  city: string;
  description: string;
  price: string;
  address: string;
  country: string;
  media: MediaItem[];
}

interface ItemProps {
  property: Property;
}

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL!
const placeholderImage = "/fallback-image.jpg"; // Ensure this exists in /public

const getMediaUrl = (file: string, mediaType: "image" | "video") => {
  if (!file) return placeholderImage; // Return fallback image if empty

  // Remove "auto/upload/" from the file path if it exists
  const cleanedFile = file.replace(/^auto\/upload\//, "");

  if (file.startsWith("http")) {
    // If the file is already a full URL, return it directly
    return file;
  }

  // Construct the Cloudinary URL
  return `${CLOUDINARY_BASE_URL}/${mediaType}/upload/${cleanedFile}`;
};

// Function to generate a random delay between min and max milliseconds
const getRandomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const Item: React.FC<ItemProps> = ({ property }) => {
  const swiperRef = useRef<SwiperType | null>(null); // Correct type for the swiper instance
  const [randomDelay, setRandomDelay] = useState<number>(0); // State to store random delay

  // Set a random delay when the component mounts
  useEffect(() => {
    const delay = getRandomDelay(3000, 9000); // Random delay between 3s and 9s
    setRandomDelay(delay);
  }, []); // Empty dependency array ensures this runs only on mount

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



  return (
    <div className="rounded-2xl p-5 bg-white font-montserrat">
      <div className="pb-2 relative">
        {property.media && property.media.length > 0 ? (
          <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign reference to swiper instance
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: randomDelay, disableOnInteraction: true }} // Use random delay
          onMouseEnter={handleMouseEnter} // Stop autoplay on hover
          onMouseLeave={handleMouseLeave} // Start autoplay on mouse leave
          className="w-full rounded-xl"
          >
            {property.media.map((mediaItem) => (
              <SwiperSlide key={mediaItem.id}>
                <Link href={`/listing/${property.id}`}>
                  {mediaItem.media_type === "image" ? (
                    <Image
                      src={getMediaUrl(mediaItem.file, "image")}
                      alt={property.title}
                      width={400}
                      height={200}
                      priority
                      className="w-full lg:h-[12rem] object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                      }}
                    />
                  ) : (
                    <video
                      src={getMediaUrl(mediaItem.file, "video")}
                      className="w-full lg:h-[12rem] object-cover rounded-xl"
                      controls
                      muted
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Link href={`/listing/${property.id}`}>
            <Image
              src={placeholderImage}
              alt="No media available"
              width={400}
              height={200}
              priority
              className="w-full lg:h-[12rem] object-cover rounded-xl"
            />
          </Link>
        )}
        <div className="absolute top-4 right-6 z-10">
          <HeartBtn propertyId={property.id.toString()} />
        </div>
      </div>

      <div className="font-bold text-gray-30 truncate">
        Tsh: {parseFloat(property.price).toLocaleString()}
      </div>
      <h4 className="medium-18 line-clamp-1">{property.title}</h4>

      <p className="pt-2 mb-4 line-clamp-2">{property.description}</p>

      <div className="flexBetween">
        <h5 className="my-1 text-gray-30 flex gap-2">
          <MapPinHouse /> {property.city}
        </h5>

        <Link href={`/listing/${property.id}`}>
          <button className="btn-secondary rounded-lg !py-[6px] !px-2 shadow-sm truncate">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Item;