"use client";
import Link from "next/link";
import { IoCall, IoMail, IoArrowUp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { usefetchObj } from "@/utils/fetchObj";
import Image from "next/image";

export default function Footer() {
  const { data: contactInfo } = usefetchObj("contact");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-secondary w-full">
      <div className="relative min-h-[400px] flex flex-col py-10">
        <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-7xl px-4 mx-auto mb-10 md:mb-0">
          <div className="flex flex-col gap-10">
            <Link href="/">
              <Image src="/logo.png" width={150} height={150} alt="logo" />
            </Link>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2"
              >
                <IoCall size={20} className="text-green-1000" />
                <span className="text-md text-gray-400 hover:text-green-1000 duration-300">
                  {contactInfo.phone}
                </span>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2"
              >
                <IoMail size={20} className="text-green-1000" />
                <span className="text-md text-gray-400 hover:text-green-1000 duration-300">
                  {contactInfo.email}
                </span>
              </a>
            </div>
          </div>

          <div className="flex gap-10 sm:gap-16 mt-6 lg:mt-0">
            <div className="flex flex-col">
              <ul className="text-gray-400 text-md">
                <Link href="/one-day-tours">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    One Day Tours
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/experience">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    Experience
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/adventures">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    Adventures
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/all-tours">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    All Tours
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
              </ul>
            </div>

            <div className="flex flex-col">
              <ul className="text-gray-400 text-md">
                <Link href="/our-team">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    Our Team
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/faq">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    FAQ
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/about">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    About
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
                <Link href="/contact">
                  <li className="relative group hover:translate-x-6 hover:text-white transition-all duration-500 mb-4">
                    Contact
                    <span className="absolute bottom-1/2 -left-4 w-3 h-[2px] bg-green-1000 scale-x-0 group-hover:scale-x-100 transition-all"></span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-5/6 bg-secondary-200 rounded-tl-lg overflow-hidden">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                className="bg-green-1000 px-6 py-6 rounded-tl-lg hover:bg-secondary-300 transition-all duration-500"
                onClick={scrollToTop}
              >
                <IoArrowUp size={24} className="text-white" />
              </button>

              <div className="hidden md:flex gap-4">
                {contactInfo.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-secondary-300 p-4 rounded-full hover:scale-105 hover:bg-green-1000 hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaFacebook size={14} className="text-white" />
                    </div>
                  </a>
                )}

                {contactInfo.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-secondary-300 p-4 rounded-full hover:scale-105 hover:bg-green-1000 hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaInstagram size={14} className="text-white" />
                    </div>
                  </a>
                )}

                {contactInfo.youtube && (
                  <a
                    href={contactInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-secondary-300 p-4 rounded-full hover:scale-105 hover:bg-green-1000 hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaYoutube size={14} className="text-white" />
                    </div>
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white font-semibold mt-4 sm:mt-0 pr-2 sm:pr-10 2xl:mr-72">
              Copyright © 2025 | Created By ZTI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
