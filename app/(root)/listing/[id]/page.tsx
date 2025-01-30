"use client";

import HeartBtn from "@/components/HeartBtn";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import {
  MdOutlineBathroom,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { PROPERTIES } from "@/constants/data";
import { FaLocationDot } from "react-icons/fa6";
import MapComponent from "@/components/Map";


const SingleProperty: React.FC = () => {
  const { id } = useParams(); // Get the dynamic route id
  const property = PROPERTIES.find((p) => p.id === Number(id)); // Find property by id

  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }

  return (
    <section className="max-padd-container my-[99px] ">
      {/* Single property card */}
      <div className="pb-2 relative ">
        <Image
          src={property.image}
          alt={property.title}
          width={100000}
          height={10000}
          className="rounded-xl self-center w-full object-cover"
        />
        <div className="absolute top-6 right-8">
          {/* Like button */}
          <HeartBtn />
        </div>
      </div>
      <div className="xl:flexBetween gap-8">
        <div className="flex-1">
          {/* left side */}

          <h5 className="bold-16 my-1 text-zinc-500">{property.city}</h5>
          <div className="flexbetween">
            <h4 className="medium-18 line-clamp-1">{property.title}</h4>
            <div className="bold-20">Tsh {property.price}.00</div>
          </div>
          <div className="flex gap-x-4 py-2">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed />
              <span>{property.facilities.bedrooms}</span>
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathroom />
              <span>{property.facilities.bathrooms}</span>
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage />
              <span>{property.facilities.parkings}</span>
            </div>
          </div>
          <p className="pt-2 mb-4 line-clamp-2">{property.description}</p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            <div>
              {property?.address} {property?.city} {property?.country}
            </div>
          </div>
          <div className="flexBetween">
            <button className="btn-secondary rounded-lg !py-[7px] !px-5 shadow-sm">
              Book the Visit
            </button>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <MapComponent
            address={property?.address}
            city={property?.city}
            country={property?.country}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProperty;
