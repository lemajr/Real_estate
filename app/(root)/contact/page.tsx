"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import Link from "next/link";
import { MdPhone, MdMyLocation } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoIosSend, IoMdChatboxes } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // State for phone number

  return (
    <main className="relative max-padd-container my-[99px] overflow-hidden">
      <div className=" max-md:py-2 xl:py-22 w-full bg-[#f8f9fa] ">
        <div className="py-12 z-10">
          <div className="max-w-3xl mx-auto text-center pb-8">
            <h2 className="h2">Contact our team</h2>
            <h5 className="text-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab quos
              a unde! Corporis iure vitae deserunt nobis veritatis voluptatem
              quaerat.
            </h5>
          </div>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-[6rem] mt-16 ">
            <div className="flex-1 relative z-40">
              {/* Contact Form */}
              <form action="">
                <div className="flex gap-3 flex-wrap">
                  <div className="w-full">
                    <label htmlFor="Fname" className="block mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      id="Fname"
                      name="Fname"
                      placeholder="First name"
                      className="w-full p-3 border border-slate-900/50 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lname" className="block mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Last name"
                      className="w-full p-3 border border-slate-900/50 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-slate-900/50 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="phone" className="block mb-2">
                    Phone number
                  </label>
                  <div className="flex rounded-md bg-white">
                    <PhoneInput
                      international
                      defaultCountry="TZ"
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value ?? "")}
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      className="w-full p-3 border border-slate-900/50 rounded-lg !focus:outline-none !focus:ring-0 !important"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="message" className="block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    className="w-full p-3 border border-slate-900/50 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 text-white bg-primary hover:bg-primary-dark rounded-lg mt-6"
                >
                  Send message
                </button>
              </form>
            </div>
            <div className="flex-1 space-y-6 relative z-20">
              <div className="font-sans">
                {/* Heading */}
                <h5 className="text-2xl font-bold text-gray-800 mb-4">
                  Chat with us
                </h5>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-6">
                  Speak to our friendly team via live chat
                </p>

                {/* Links */}
                <ul className="space-y-4">
                  {/* WhatsApp Link */}
                  <li className="flex items-center gap-3">
                    <IoMdChatboxes className="text-2xl " />
                    <Link
                      href="https://wa.me/255744135000"
                      className="text-lg  transition-colors underline underline-offset-8"
                    >
                      Start a live chat
                    </Link>
                  </li>

                  {/* Email Link */}
                  <li className="flex items-center gap-3">
                    <IoIosSend className="text-2xl" />
                    <Link
                      href="mailto:support@example.com"
                      className="text-lg transition-colors underline underline-offset-8"
                    >
                      Shoot us on email
                    </Link>
                  </li>

                  {/* Facebook Link */}
                  <li className="flex items-center gap-3">
                    <BsFacebook className="text-2xl " />
                    <Link
                      href="https://facebook.com/jackobonchimbi"
                      className="text-lg transition-colors underline underline-offset-8"
                    >
                      Message us on Facebook
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="medium-18">Call us</h5>
                <p className="py-3">Call our team Mon-Fri from 8am to 5pm</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MdPhone />
                    <Link href="tel:+25569500360" className="">
                      +255 744-135-000
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="medium-18">Visit us</h5>
                <p className="py-3">
                  Chat to us in person at our Dar es Salaam HQ
                </p>
                <div className="flex items-center gap-2">
                  <MdMyLocation />
                  <address className="not-italic">
                    <Link
                      href="https://www.google.com/maps/search/?api=1&query=100+Science+Street,Dar+es+Salaam,Tanzania"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      100 Science Street, Dar es Salaam, 30286
                    </Link>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
        width={80}
        height={80}
        squares={[80, 80]}
        squaresClassName=""
      />
    </main>
  );
};

export default Contact;
