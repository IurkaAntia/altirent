"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;

        if (scrollY <= 10) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setLastScrollY(scrollY);
      }
    };

    if (mounted) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, mounted]);

  const links = [
    { href: "/all-tours", label: "Available Gear" },
    { href: "/experience", label: "Experience" },
    { href: "/adventures", label: "Adventures" },
    // { href: "/all-tours", label: "All Tours" },
    { href: "/our-team", label: "Our Team" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
  ];

  if (!mounted) return null;

  return (
    <div
      className={`min-h-24 justify-around items-center bg-secondary fixed w-full px-28 top-0 left-0
      transition-all duration-700 ease-in-out hidden lg:flex
      ${
        isVisible
          ? "opacity-100 translate-y-0 z-50"
          : "opacity-0 -translate-y-20 -z-10"
      }`}
    >
      <Link href="/">
        <Image src="/logo.png" width={150} height={150} alt="logo" />
      </Link>
      <ul className="flex gap-12 text-white font-semibold">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={`relative pb-9 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-green-1000"
                    : "border-b-2 border-transparent"
                } ${
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
    </div>
  );
}
