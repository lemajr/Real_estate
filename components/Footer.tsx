'use client'

import { FOOTER_LINKS, SOCIALS } from "@/constants/data";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="max-padd-container mb-4">
      <div className="max-padd-container bg-[#f8f9fa] rounded-3xl pt-14 xl:pt-20 pb-8">
        <h3 className="h3">Elevate Your Real Estate Experience</h3>
        <p>
          At Blackwill International, we present a curated collection of premium properties alongside bespoke services that cater to your discerning lifestyle. Discover opportunities that redefine luxury and functionality.
        </p>
        <hr className="my-8 bg-slate-900/30 h-[2px]" />
        {/* container */}
        <div className="flex justify-between flex-wrap gap-x-2 gap-y-8 py-16">
          <div className="max-w-sm">
            <Link href={"/"} className="">
              <span className="font-[900] text-[24px]">BLACKWILL</span>
            </Link>
            <p className="py-4">
              Our commitment to excellence shines through every project we undertake. With a focus on innovation and design, we ensure that our portfolio meets the highest standards of luxury and service.
            </p>
            <div className="flex items-center pl-6 max-md:pl-4 h-[3.3rem] bg-white w-full max-w-[366px] mx-auto rounded-full ring-1 ring-slate-500/5">
              <input
                type="email"
                placeholder="Enter your email"
                className="absolute bg-transparent border-none outline-none"
              />
              <div className="w-full flex justify-end">
                <button className="btn-secondary !py-[13px] text-white rounded-full relative">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-8">
            {FOOTER_LINKS.map((col) => (
              <FooterColumn key={col.id} title={col.title}>
                <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                  {col.links.map((link) => (
                    <Link href={link.url} key={link.id}>
                      {link.label}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            <div className="flex">
              <FooterColumn title={SOCIALS.title}>
                <ul className="flex gap-4">
                  {SOCIALS.links.map((link) => (
                    <Link href={"/"} key={link.id} className="text-xl">
                      {link.icon}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <p className="text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween">
        <span>© {currentYear} Blackwill International</span> All rights reserved
      </p>
    </footer>
  );
};

export default Footer;

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};
