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
import { getInToTouch } from "@/lib/actions";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactFormData, contactSchema } from "@/components/validationSchema";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const phoneValue = watch("phone");


  const onSubmit = async (formData: ContactFormData) => {
    setLoading(true);
  
    try {
      const response = await getInToTouch(formData);
  
      if (response.success) {
        toast.success(response.message.text);
        setValue("phone", "");
        reset();
      } else {
        toast.error(response.message.text);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="relative max-padd-container my-[99px] overflow-hidden">
      <div className=" max-md:py-2 xl:py-22 w-full bg-[#f8f9fa] ">
        <div className="py-12 z-10">
          <div className="max-w-3xl mx-auto text-center pb-8">
            <h2 className="h2">Contact our team</h2>
            <h5 className="text-md">
  Looking to buy, sell, or rent a property? Our experts are here to assist you every step of the way.  
  Get in touch with us for personalized real estate solutions.
            </h5>
          </div>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-[6rem] mt-16 ">
            <div className="flex-1 relative z-40">
              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-3 flex-wrap">
                  <div className="w-full">
                    <label htmlFor="fname" className="block mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      {...register("fname")}
                      placeholder="First name"
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.fname && (
                      <p className="text-red-500">{errors.fname.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="lname" className="block mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      {...register("lname")}
                      placeholder="Last name"
                      className="w-full p-3 border rounded-lg"
                    />
                    {errors.lname && (
                      <p className="text-red-500">{errors.lname.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="phone" className="block mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="TZ"
                    value={phoneValue} 
                    onChange={(value) => setValue("phone", value ?? "")}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="mt-3">
                  <label htmlFor="message" className="block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    placeholder="Message"
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full p-3 text-white bg-primary hover:bg-primary-dark rounded-lg mt-6"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
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
