"use client";
import { usefetchObj } from "@/utils/fetchObj";
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoCall, IoMail, IoLocation } from "react-icons/io5";
import { ThreeDot } from "react-loading-indicators";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: contactInfo, loading: fetchLoading } = usefetchObj("contact");

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/contactLids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, email, comment }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Send successful! ✅");
        setFirstName("");
        setEmail("");
        setComment("");
      } else {
        setMessage(data.error || "Subscription failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (fetchLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <ThreeDot
          variant="bounce"
          color="#313041"
          size="small"
          text=""
          textColor=""
        />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-0 mt-16">
      {contactInfo.length == 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold mb-10 px-4 sm:px-8">
            no result found
          </h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row justify-center lg:items-start">
            <div className="flex flex-col items-center lg:items-start justify-center px-2 lg:px-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold">
                Any Question? Feel Free to Contact
              </h1>
              <div className="flex gap-4 mt-8">
                {contactInfo.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-green-1000 p-4 rounded-full hover:scale-105 hover:bg-secondary hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaFacebook size={18} className="text-white" />
                    </div>
                  </a>
                )}
                {contactInfo.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-green-1000 p-4 rounded-full hover:scale-105 hover:bg-secondary hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaInstagram size={18} className="text-white" />
                    </div>
                  </a>
                )}
                {contactInfo.youtube && (
                  <a
                    href={contactInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-green-1000 p-4 rounded-full hover:scale-105 hover:bg-secondary hover:rotate-[360deg] transition-transform duration-500 ease-in-out">
                      <FaYoutube size={18} className="text-white" />
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-grow justify-center items-center px-4 mt-8 lg:mt-0">
              <form
                onSubmit={handleContact}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex flex-col w-full lg:w-auto lg:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="border-none bg-[#f7fcfe] rounded-lg w-full lg:min-w-[400px] h-16 px-6 outline-none focus:ring-0"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="border-none bg-[#f7fcfe] rounded-lg w-full lg:min-w-[400px] h-16 px-6 outline-none focus:ring-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <textarea
                  className="border-none bg-[#f7fcfe] rounded-lg w-full lg:min-w-[400px] h-52 px-6 py-4 outline-none"
                  placeholder="Write Comment"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="relative w-full min-h-16 px-6 bg-green-1000 font-semibold text-white overflow-hidden rounded-lg group"
                  disabled={loading}
                >
                  <span className="absolute inset-0 bg-secondary transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
                  <span className="relative transition-colors duration-100">
                    {loading ? "SENDING..." : "SEND A MESSAGE"}
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-12 gap-4">
            {contactInfo.phone && (
              <div className="flex items-center justify-center border rounded-lg shadow-md w-full lg:w-auto py-10 px-16 group">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2"
                >
                  <div className="rounded-full bg-slate-50 p-4 group-hover:bg-green-1000 transition-all ease-in-out duration-500 group-hover:scale-105">
                    <IoCall
                      size={28}
                      className="text-green-1000 group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <span className="text-xl ml-4 text-gray-400 group-hover:text-green-1000 duration-500">
                    {contactInfo.phone}
                  </span>
                </a>
              </div>
            )}

            {contactInfo.location && (
              <div className="flex items-center justify-center border rounded-lg shadow-md w-full lg:w-auto py-10 px-16 group">
                <a
                  href={`https://www.google.com/maps?q=${contactInfo.location}`}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <div className="rounded-full bg-slate-50 p-4 group-hover:bg-green-1000 transition-all ease-in-out duration-500 group-hover:scale-105">
                    <IoLocation
                      size={28}
                      className="text-green-1000 group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <span className="text-xl ml-4 text-gray-400 group-hover:text-green-1000 duration-500">
                    {contactInfo.location}
                  </span>
                </a>
              </div>
            )}

            {contactInfo.email && (
              <div className="flex items-center justify-center border rounded-lg shadow-md w-full lg:w-auto py-10 px-16 group">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2"
                >
                  <div className="rounded-full bg-slate-50 p-4 group-hover:bg-green-1000 transition-all ease-in-out duration-500 group-hover:scale-105">
                    <IoMail
                      size={28}
                      className="text-green-1000 group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <span className="text-xl ml-4 text-gray-400 group-hover:text-green-1000 duration-500">
                    {contactInfo.email}
                  </span>
                </a>
              </div>
            )}
          </div>

          {message && (
            <p
              className="fixed top-4 right-4 px-6 py-3 text-white text-lg bg-green-500 rounded-lg shadow-lg opacity-100 transition-all duration-300 transform translate-y-0 z-50"
              style={{
                animation: "slideIn 0.5s ease, fadeOut 0.5s 2.5s forwards",
              }}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
