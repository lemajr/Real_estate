"use client";

import React, { useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Item from "./Item";
import { fetchProperties, Property } from "@/lib/data";
import SkeletonCard from "./SkeletonCard";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data.slice(0, 9));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    loadProperties();
  }, []);

  return (
    <section id="latest-items" className="max-padd-container">
      <div className="max-padd-container bg-[#f8f9fa] py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">Your Future Home Await</span>
        <h2 className="h2">Find Your Dream Here</h2>
        <div className="flexBetween mt-8 mb-6">
          <h5>
            <span className="font-bold">Show 1-9</span> out of 3k properties
          </h5>
          <span className="bg-white flex justify-center items-center text-3x rounded-md h-10 w-10 p-2 border">
            <VscSettings />
          </span>
        </div>

        {/* Swiper container */}
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
        >

          {/* Show skeleton cards while loading */}
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : properties.length > 0 ? (
              properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <Item property={property} />
                </SwiperSlide>
              ))) : (
                <SwiperSlide>
    <div className="text-center py-8">
      <h3 className="text-lg font-semibold">No properties found</h3>
    </div>
  </SwiperSlide>
              )}
        </Swiper>
      </div>
    </section>
  );
};

export default Properties;
