import Link from "next/link";
import { IoCall, IoMail } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { usefetchObj } from "@/utils/fetchObj";

export default function Contact() {
  const { data: contactInfo } = usefetchObj("contact");

  return (
    <div className={`justify-around items-center bg-filter hidden lg:flex`}>
      <div className="flex gap-10">
        <a
          href={`tel:${contactInfo.phone}`}
          className="flex items-center gap-2"
        >
          <IoCall size={20} className="text-green-1000" />
          <span className="text-sm text-gray-400 hover:text-white duration-1000">
            {contactInfo.phone}
          </span>
        </a>

        <a
          href={`mailto:${contactInfo.email}`}
          className="flex items-center gap-2"
        >
          <IoMail size={20} className="text-green-1000" />
          <span className="text-sm text-gray-400 hover:text-white duration-1000">
            {contactInfo.email}
          </span>
        </a>
      </div>

      <div className="flex gap-6 items-center">
        {contactInfo.facebook && (
          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              size={15}
              className="text-white hover:text-green-1000 transition duration-300"
            />
          </a>
        )}

        {contactInfo.instagram && (
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={15}
              className="text-white hover:text-green-1000 transition duration-300"
            />
          </a>
        )}
        {contactInfo.youtube && (
          <a
            href={contactInfo.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube
              size={15}
              className="text-white hover:text-green-1000 transition duration-300"
            />
          </a>
        )}

        <Link href="/contact">
          <button className="relative px-12 py-2 bg-green-1000 font-semibold text-white overflow-hidden group border border-green-1000">
            <span className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
            <span className="relative group-hover:text-black transition-colors duration-100">
              Contact
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
