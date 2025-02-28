"use client";
import { useFetchData } from "@/utils/fetchData";
import { ThreeDot } from "react-loading-indicators";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import Image from "next/image";

export default function BestOffers() {
  const [likedState, setLikedState] = useState<{ [key: string]: boolean }>({});

  //for like
  useEffect(() => {
    const savedLikedState = localStorage.getItem("likedState");
    if (savedLikedState) {
      setLikedState(JSON.parse(savedLikedState));
    }
  }, []);

  // Save likedState to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(likedState).length > 0) {
      localStorage.setItem("likedState", JSON.stringify(likedState));
    }
  }, [likedState]);

  const handleLike = (tourId: string) => {
    setLikedState((prev) => ({
      ...prev,
      [tourId]: !prev[tourId],
    }));
  };

  const { data: tours, loading } = useFetchData("tours?bestOffer=true&limit=4");

  if (loading)
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
    <div className="flex flex-col justify-center items-center mt-20 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-4xl font-semibold text-center">
        BEST OFFERS
      </h2>

      <div className="mt-6 sm:mt-10 space-y-4 px-4 xl:px-0">
        <div className="flex flex-col sm:flex-row gap-4">
          {tours.slice(0, 2).map((tour, index) => (
            <Link
              key={tour.id}
              href={`/all-tours/${tour.id}`}
              className={`w-full ${
                index === 0 ? "sm:w-1/3" : "sm:w-2/3"
              } relative group overflow-hidden rounded-lg cursor-pointer`}
            >
              <Image
                className="h-64 sm:h-96 w-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                width={1200}
                height={350}
                src={`/tours/${tour.image}`}
                alt={tour.title}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(tour.id);
                }}
                className="absolute top-4 right-4 text-4xl transition-transform duration-500 hover:scale-105 hover:rotate-12 z-10"
              >
                <IoHeart
                  className={
                    likedState[tour.id] ? "text-red-500" : "text-white"
                  }
                />
              </button>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-35 opacity-0 translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-end p-4 sm:p-6 rounded-lg">
                <span className="text-white text-lg sm:text-xl font-semibold">
                  {tour.title}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {tours.slice(2, 4).map((tour, index) => (
            <Link
              key={tour.id}
              href={`/all-tours/${tour.id}`}
              className={`w-full ${
                index === 0 ? "sm:w-2/3" : "sm:w-1/3"
              } relative group overflow-hidden rounded-lg cursor-pointer`}
            >
              <Image
                className="h-64 sm:h-96 w-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300"
                width={1200}
                height={350}
                src={`/tours/${tour.image}`}
                alt={tour.title}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(tour.id);
                }}
                className="absolute top-4 right-4 text-4xl transition-transform duration-500 hover:scale-105 hover:rotate-12 z-10"
              >
                <IoHeart
                  className={
                    likedState[tour.id] ? "text-red-500" : "text-white"
                  }
                />
              </button>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-end p-4 sm:p-6 rounded-lg">
                <span className="text-white text-lg sm:text-xl font-semibold">
                  {tour.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-12 lg:mt-0">
        <Link
          href="/all-tours?bestOffer=true"
          className="relative sm:mt-10 px-6 sm:px-8 py-3 bg-green-1000 text-white overflow-hidden rounded-lg group text-sm sm:text-base"
        >
          <span className="absolute inset-0 bg-secondary transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
          <span className="relative transition-colors duration-100">
            SEE ALL
          </span>
        </Link>
      </div>
    </div>
  );
}
