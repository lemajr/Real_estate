'use client'

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import aboutImage from "@/public/assets/about.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import CountUp from "react-countup";


interface Statistic {
  value: number;
}

const statistics: Statistic[] = [
  {
    label: "Happy Clients",
    value: 1000,
  },
  {
    label: "Projects Completed",
    value: 100,
  },
  {
    label: "Years of Experience",
    value: 10,
  },
];

const About = () => {

  const [isVisible, seIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector("about");
      if(aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        seIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="max-padd-container py-16 xl:py-28">
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="flex-1 relative">
          <Image
            src={aboutImage}
            alt=""
            width={100}
            height={100}
            className="rounded-3xl rounded-tr-[155px] w-[488px]"
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-xl flexCenter flex-col">
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="text-2xl" />
            </span>
            <p className="text-center relative bottom-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repudiandae assumenda obcaecati ipsum iusto nam.
            </p>
          </div>
        </div>
        {/* right side */}
        <div>
          <span>Unveiling Our Journry</span>
          <h2>Our Commitment Craft Extraordinary Real Easte Experiences </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            voluptas a soluta, laboriosam, rerum voluptatibus eius velit
            aspernatur animi facilis eum minus quae numquam ex libero veritatis
            aliquid, ipsum exercitationem. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Numquam dignissimos unde nobis odio?
            Aliquid eum iure provident, aspernatur illum mollitia magnam,
            asperiores debitis commodi incidunt cumque enim modi deleniti
            minima.
          </p>
          <div>
            { statistics.map((statistic, index) => (
              <div key={index}>
                <div>
                  <CountUp start={isVisible ? 0 : undefined} end={statistic.value} duration={10} delay={3}>
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef} className="text-2xl font-semibold"></h3>
                    )}
                  </CountUp>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
