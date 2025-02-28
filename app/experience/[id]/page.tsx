"use client";
import { usefetchObj } from "@/utils/fetchObj";
import { notFound, useParams } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tours from "@/components/UI/Tours";
import { useFetchData } from "@/utils/fetchData";
import Experience from "@/components/Experience";
import Image from "next/image";

export default function ExperienceDetail() {
  const params = useParams();

  const { data: tour, loading, error } = usefetchObj(`allTours/${params.id}`);

  const { data: tours } = useFetchData(
    `tours?experience=false&adventures=false&typeId=${tour.typeId}&limit=6&${
      params.id ? `&id=${params.id}` : ""
    }`,
  );

  if (!tour || error) return notFound();

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <ThreeDot variant="bounce" color="#313041" size="small" text="" />
      </div>
    );

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
    <>
      <div className="container mx-auto mt-12 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col xl:flex-row justify-between items-start space-y-6 xl:space-y-0 xl:space-x-8">
          {tour.gallery?.length > 0 ? (
            <div className="w-full xl:w-2/3">
              <Slider {...sliderSettings}>
                {tour.gallery?.map((image: { id: number; image: string }) => (
                  <div
                    key={image.id}
                    className="relative w-full aspect-[16/9] md:aspect-[4/3] xl:aspect-[3/2] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={`/tours/${image.image}`}
                      width={1200}
                      height={800}
                      alt={tour.title}
                      className="w-full h-full object-cover rounded-lg shadow-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <Image
              src={`/tours/${tour.image}`}
              width={1200}
              height={500}
              alt={tour.title}
              className="w-full max-h-[500px] object-cover rounded-lg shadow-xl"
            />
          )}

          {tours.length > 1 && (
            <div className="flex-grow w-full xl:max-w-md">
              <p className="text-3xl xl:text-2xl font-semibold text-center">
                Tours you may be interested in
              </p>
              <hr className="h-1/2 my-6 sm:my-8 border-filter" />
              <div className="">
                <Tours
                  haveBorder={true}
                  tours={tours}
                  hrefTo="all-tours"
                  slidesToShow={1}
                />
              </div>
            </div>
          )}
        </div>

        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold mt-12 ${
            tour.gallery?.length > 0 ? "" : "xl:-mt-28"
          }`}
        >
          {tour.title}
        </h1>
        <p className="text-sm sm:text-base text-primary-100 mt-2">
          Location: {tour.location}
        </p>
        <p className="text-sm text-green-1000">type: {tour.type.name}</p>
        <p className="mt-4 text-base sm:text-lg">{tour.description}</p>

        <hr className="mt-12 mb-8 h-1/2 border-filter" />

        <Experience moreStyle="max-w-[90rem]" />
      </div>
    </>
  );
}
