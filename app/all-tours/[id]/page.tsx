"use client";
import { useEffect, useState } from "react";
import { usefetchObj } from "@/utils/fetchObj";
import { notFound, useParams } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";
import Book from "@/components/Book";
import { useFetchData } from "@/utils/fetchData";
import ToursCard from "@/components/UI/ToursCard";
import AllButton from "@/components/UI/AllButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoHeart } from "react-icons/io5";
import Image from "next/image";

export default function TourDetail() {
  const params = useParams();
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

  const { data: tour, loading, error } = usefetchObj(`allTours/${params.id}`);
  const { data: tours } = useFetchData(`tours?limit=3&id=${params.id}`);

  if (!tour || error) return notFound();

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <ThreeDot variant="bounce" color="#313041" size="small" text="" />
      </div>
    );

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="flex flex-col 2xl:flex-row justify-between items-start space-y-6 2xl:space-y-0 2xl:space-x-8">
        <div className="relative flex-shrink-0 w-full h-full 2xl:w-2/3 mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLike(tour.id);
            }}
            className="absolute top-4 right-4 text-4xl transition-transform duration-500 hover:scale-105 hover:rotate-12 z-10"
          >
            <IoHeart
              className={likedState[tour.id] ? "text-red-500" : "text-white"}
            />
          </button>
          {tour.gallery?.length > 0 ? (
            <Slider {...sliderSettings}>
              {tour.gallery?.map((image: { id: number; image: string }) => (
                <div
                  key={image.id}
                  className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={`/tours/${image.image}`}
                    width={1200}
                    height={500}
                    alt={tour.title}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <Image
              src={`/tours/${tour.image}`}
              width={1200}
              height={500}
              alt={tour.title}
              className="w-full max-h-[500px] object-cover rounded-lg shadow-xl"
            />
          )}
        </div>

        <div className="flex-grow">
          <Book tourId={tour.id} tourPrice={tour.price} />
        </div>
      </div>
      <p className="text-md text-green-1000 font-semibold mt-8">
        Tour duration: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
      </p>
      <h1 className="text-2xl sm:text-4xl font-semibold my-2">{tour.title}</h1>
      <p className="text-sm text-green-1000">Location: {tour.location}</p>
      <p className="text-sm text-green-1000">Price: {tour.price}$</p>
      <p className="text-sm text-green-1000">type: {tour.type.name}</p>
      <p className="mt-4 text-lg">{tour.description}</p>

      <hr className="mt-12 h-1/2 border-filter" />
      <div className="mt-12">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center">
          ALL GEARS
        </h2>

        <div className="my-6">
          <ToursCard
            tours={tours}
            hrefTo="all-tours"
            showDetail={true}
            showDuration={true}
          />
        </div>

        <div className="flex justify-center items-center">
          <AllButton hrefTo="all-tours" />
        </div>
      </div>
    </div>
  );
}
