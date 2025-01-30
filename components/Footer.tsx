import { FOOTER_LINKS, SOCIALS } from "@/constants/data";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="max-padd-container mb-4">
      <div className="max-padd-container bg-[#f8f9fa] rounded-3xl pt-14 xl:pt-20 pb-8">
        <h3 className="h3">Explore real estate opportunities with us?</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          delectus eligendi, debitis quisquam placeat officiis laudantium
          explicabo. Maxime dolorum architecto harum, accusantium odio sequi
          deserunt ab, exercitationem placeat eum dolores.
        </p>
        <hr className="my-8 bg-slate-900/30 h-[2px]" />
        {/* container */}
        <div className="flex justify-between flex-wrap gap-x-2 gap-y-8 py-16">
          <div className="max-w-sm">
            <Link href={"/"} className="">
              <span className="font-[900] text-[24px]">Black</span>
              <span className="font-[600] medium-20">WILL</span>
            </Link>
            <p className="py-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              dolores nostrum velit fuga facilis quod necessitatibus ratione
              voluptatum! 
            </p>
            <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none"
              />
              <button className="btn-secondary rounded-full relative right-[0.33rem]">
                Subbscribe
              </button>
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-8">
          {FOOTER_LINKS.map((col) => (
              <FooterColumn key={col.id} title={col.title}>
                {/* urls */}
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
                  {SOCIALS.links.map((link,) => (
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
      {/* coyright */}

      <p className="text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween">
        <span>©2025 Blackwill</span>All right reserverd
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
