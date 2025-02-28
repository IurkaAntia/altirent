"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/contactLids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Subscription successful! ✅");
        setEmail("");
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

  return (
    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center mt-20 py-16 px-12 lg:px-2 bg-green-1000 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/book-now-shape.png"
          width={1200}
          height={1200}
          className="w-full h-full object-cover opacity-5"
          alt="Background Shape"
        />
      </div>

      <div className="relative z-10">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-white mr-8">
          Subscribe to our newsletter!
        </p>
      </div>

      <form
        onSubmit={handleSubscribe}
        className="relative z-10 flex flex-col lg:flex-row lg:p-0 space-y-2 lg:space-y-0 lg:space-x-8"
      >
        <input
          type="email"
          placeholder="Email address"
          required
          className="border-none shadow-lg rounded-lg w-full lg:min-w-[450px] h-16 px-6 outline-none focus:ring-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="relative w-full lg:w-60 min-h-16 px-6 bg-secondary font-semibold text-white overflow-hidden rounded-lg group"
          disabled={loading}
        >
          <span className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
          <span className="relative group-hover:text-black transition-colors duration-100">
            {loading ? "Subscribing..." : "Subscribe"}
          </span>
        </button>
      </form>

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
    </div>
  );
}
