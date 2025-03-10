"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "./(navbar)/Navbar";
import Image from "next/image";
import { MdClose, MdMenu } from "react-icons/md";
import Logo from "@/public/assets/logo.jpeg";
import SignInForm from "./SignInForm";

const Header = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const toggleMenu = () => setmenuOpened(!menuOpened);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (menuOpened) {
          setmenuOpened(false);
        }
      }

      setActive(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
  }, [menuOpened]);
  return (
    <header className="max-padd-container fixed top-1 w-full left-0 right-0 z-50">
      <div
        className={` ${
          active ? "py-0" : "py-1"
        } max-padd-container bg-white transition-all duration-200 rounded-full px-5 ring-1 ring-slate-900/5 `}
      >
        <div className="flexBetween py-3">
          <Link href="/">
            <div className="flex gap-4">
              <Image
                src={Logo}
                height={200}
                width={200}
                priority
                alt=""
                className="w-8 h-8 rounded-2xl"
              />
              <span className="font-[900] text-[20px] font-poppins hidden md:flex lg:flex xl:flex">
                BLACKWILL
              </span>
            </div>
          </Link>
          <div className="flexCenter gap-x-4">
            {/* Desktop */}
            <Navbar
              containerStyles={
                "hidden xl:flex gap-x-5 xl:gap-x-10 capitalize medium-15 ring-1 ring-slate-900/10 rounded-full p-2 bg-secondary"
              }
            />
            {/* Mobile */}
            <Navbar
              containerStyles={`${
                menuOpened
                  ? "flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50"
                  : "flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              }`}
            />
          </div>
          {/* button */}
          <div className="flexBetween gap-x-3 sm:gap-x-5 bold-16">
            {!menuOpened ? (
              <MdMenu
                onClick={toggleMenu}
                className="xl:hidden cursor-pointer text-3xl hover:text-gray-500"
              />
            ) : (
              <MdClose
                onClick={toggleMenu}
                className="xl:hidden cursor-pointer text-3xl hover:text-gray-500"
              />
            )}
          <SignInForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
