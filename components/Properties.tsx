'use client'

import Link from "next/link";
import React from "react";
import { VscSettings } from "react-icons/vsc";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import Item from "./Item";
import { PROPERTIES } from "@/constants/data";

const Properties = () => {
  return (
    <section className="max-padd-container">
        <div className="max-padd-container bg-[#f8f9fa] py-16 xl:py-28 rounded-3xl">
      <span className="medium-18">Your Future Home Await</span>
      <h2 className="h2">Find Your Dream Here</h2>
      <div className="flexBetween mt-8 mb-6">
        <h5 >
            <span className="font-bold">Show 1-9</span> out of 3k properties
        </h5>
        <span className="bg-white flex justify-center items-center text-3x rounded-md h-10 w-10 p-2 border"><VscSettings /></span>
      </div>
      {/* swiper-container */}
      <Swiper
      autoplay = {{
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
        modules={[ Autoplay ]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-5 "
      >
            {
            /* swiper-wrapper */
            PROPERTIES.map((property) => (
                <SwiperSlide key={property.title}>
                    <Item property={property} />
                </SwiperSlide>
            ))}
      </Swiper>
      </div>
    </section>
  );
};

export default Properties;
