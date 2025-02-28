"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Contact from "./Contact";
import Image from "next/image";

export default function Hero({ addStyle }: { addStyle?: string }) {
  const [mounted, setMounted] = useState(false);
  const [toggle, setToggle] = useState(false);
  const pathname: string | null = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageTitle = pathname
    ? pathname.split("/")[1].replace(/-/g, " ").toUpperCase()
    : "";

  const heroStyle: string = pathname === "/" ? "min-h-screen" : "min-h-96";

  const links = [
    { href: "/available-gear", label: "Available Gear" },
    { href: "/experience", label: "Experience" },
    { href: "/adventures", label: "Adventures" },
    { href: "/all-gears", label: "All Gears" },
    { href: "/our-team", label: "Our Team" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className={`relative ${heroStyle} ${addStyle}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          width={1200}
          height={1200}
          alt="background"
          className="w-full h-full object-cover filter brightness-75"
        />
      </div>

      <div className="relative z-20">
        <Contact />

        <div
          className={`flex lg:justify-around items-center px-9 lg:px-20 fixed bg-secondary lg:relative lg:bg-opacity-0 w-full`}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              width={150}
              height={150}
              alt="logo"
              className="w-26 h-26 lg:w-40 lg:h-35 bg-clip-padding"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-12 text-white font-semibold py-6">
            {links.slice(0, -1).map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative pb-10 transition duration-300 ${
                      mounted && isActive
                        ? "border-b-2 border-green-1000"
                        : "border-b-2 border-transparent"
                    } ${
                      mounted &&
                      !isActive &&
                      "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-1000 after:transition-all after:duration-300 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* mobile Navigation */}
          <div className="lg:hidden flex flex-1 justify-end items-center">
            <Image
              src={toggle ? "/close.svg" : "/menu.svg"}
              width={30}
              height={30}
              alt="menu"
              className="object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !mounted || !toggle ? "hidden" : "show"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-secondary`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 text-white">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        className={`relative pb-2 transition duration-300 ${
                          mounted && isActive
                            ? "border-b-2 border-primary"
                            : "border-b-2 border-transparent"
                        }`}
                        onClick={() => setToggle(!toggle)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <hr className="h-1/2 border-t-1 border-filter" />
        {pathname !== "/" && (
          <div className="flex mt-48 items-center justify-center lg:mt-20">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-white mb-10 px-4 sm:px-8">
              {pageTitle}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
