import { SERVICES } from "@/constants/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

const Service = () => {
  return (
    <section id="hot-offers" className="max-padd-container">
      <div className="max-padd-container py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">Excellence in Every Solution </span>
        <h2 className="h2">Our Expert Services</h2>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-24">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl border-[11px] shadow-sm overflow-hidden relative"
          >
            <Image src={service.image} alt="" width={400} height={800} />
            <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
            <div className="absolute bottom-3 left-3 text-white text-[15px]">
              <h3 className="font-[600px] text-[16px] pt-4 leading-5">
                {service.title}
              </h3>
              <h4 className="medium-14 py-3 pt-1 text-slate-300">
                {service.category}
              </h4>
              <Link
                href="/contact"
                className="group font-semibold text-tertiary px-4 py-2 inline-flex justify-center items-center gap-1"
              >
<InteractiveHoverButton>Interested</InteractiveHoverButton>
                {/* <FaLongArrowAltRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" /> */}
              </Link>
 
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
