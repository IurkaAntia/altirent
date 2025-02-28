// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";

export default function ToursCard({
  tours = [],
  hrefTo,
  showDetail,
  showDuration,
}: {
  tours: any[];
  hrefTo: string;
  showDetail: boolean;
  showDuration: boolean;
}) {
  const [likedState, setLikedState] = useState<{ [key: string]: boolean }>({});

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

  return (
    <div className="mt-6">
      {tours.map((tour) => (
        <Link href={`/${hrefTo}/${tour.id}`} key={tour.id}>
          <div className="group relative">
            <div
              className={`w-full shadow-sm overflow-hidden rounded-lg relative ${
                showDetail ? "h-[130px]" : "h-[150px] sm:h-[250px] lg:h-[350px]"
              }`}
            >
              {/*<Image*/}
              {/*  src={`/tours/${tour.image}`}*/}
              {/*  width={1200}*/}
              {/*  height={550}*/}
              {/*  alt={tour.title}*/}
              {/*  className="rounded-lg object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"*/}
              {/*/>*/}

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
              <div className="absolute inset-0 bg-black bg-opacity-35 opacity-0 translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center rounded-lg">
                <BsPlusLg className="text-green-1000 text-4xl" />
              </div>
            </div>
            {showDetail && (
              <div className="flex justify-start items-center mt-2">
                <p className="text-md text-green-1000">
                  ${tour.price} {tour.location}{" "}
                  {showDuration && `${tour.duration} days`}
                </p>
              </div>
            )}

            <p
              className={`text-xl sm:text-2xl font-semibold hover:text-green-1000 transition-colors duration-500 ${
                !showDetail ? "text-center mt-4" : "mt-2"
              }`}
            >
              {tour.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
