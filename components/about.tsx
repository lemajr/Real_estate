'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import aboutImage from "@/public/assets/about.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import CountUp from "react-countup";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="flex-1 relative">
          <Image
            src={aboutImage}
            alt="About Us"
            width={488}
            height={488}
            className="rounded-3xl rounded-tr-[155px] w-[488px]"
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-xl flexCenter flex-col">
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="text-2xl" />
            </span>
            <p className="text-center relative bottom-3">
            At Blackwill, we transform everyday moments into extraordinary experiences, redefining luxury living.</p>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex justify-center flex-col">
          <span className="medium-18">Our Vision Unfolded</span>
          <h2 className="h2 font-geistMono">Crafting Unforgettable Hospitality & Real Estate Experiences</h2>
          <p className="my-5">
            At Blackwill International Company Limited, our ambition is to set new benchmarks in hospitality and property management. We specialize in offering premium hotels, luxurious apartments, state-of-the-art conference venues, and comprehensive business consulting. By seamlessly linking property management with personalized assistance, we ensure that every visitor—be it for leisure, business, or medical needs—finds their perfect accommodation. Our curated portfolio spans across India, South Africa, and Tanzania, guaranteeing exceptional service and impeccable locations.
          </p>
          <div className="flex flex-wrap gap-4">
              <div className="bg-[#f8f9fa] p-4 rounded-[6px]">
                <div className="flex items-center gap-1">
                  <CountUp start={isVisible ? 0 : undefined} end={100} duration={10} delay={3}>
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef as React.RefObject<HTMLHeadingElement>} className="text-2xl font-semibold"></h3>
                    )}
                  </CountUp>
                  <h2 className="bold-22">+</h2>
                </div>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-[6px]">
                <div className="flex items-center gap-1">
                  <CountUp start={isVisible ? 0 : undefined} end={85} duration={10} delay={3}>
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef as React.RefObject<HTMLHeadingElement>} className="text-2xl font-semibold"></h3>
                    )}
                  </CountUp>
                  <h2 className="bold-22">+</h2>
                </div>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="bg-[#f8f9fa] p-4 rounded-[6px]">
                <div className="flex items-center gap-1">
                  <CountUp start={isVisible ? 0 : undefined} end={4} duration={10} delay={3}>
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef as React.RefObject<HTMLHeadingElement>} className="text-2xl font-semibold"></h3>
                    )}
                  </CountUp>
                  <h2 className="bold-22">+</h2>
                </div>
                <p className="text-gray-600">Years of Experience</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
