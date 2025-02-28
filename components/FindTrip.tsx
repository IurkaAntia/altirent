"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFetchData } from "@/utils/fetchData";

export default function FindTrip() {
  const router = useRouter();
  const [direction, setDirection] = useState("");
  const [tripType, setTripType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: types } = useFetchData("tourTypes");
  const { data: locations } = useFetchData("locations");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Create query string for filters
    const queryParams = new URLSearchParams();
    if (direction) queryParams.append("direction", direction);
    if (tripType) queryParams.append("tripType", tripType);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    router.push(`/all-tours?${queryParams.toString()}`);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-auto w-full h-96 lg:h-auto px-2 lg:px-0">
      <h1 className="text-white text-3xl lg:text-7xl font-semibold text-center mb-6">
        Gear Up
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row p-2 lg:p-0"
      >
        <div className="grid grid-cols-2 lg:flex shadow-lg rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden bg-white">
          {/* Direction Selection */}
          <div className="flex flex-col w-full lg:w-48 h-24 border-b lg:border-b-0 border-r border-gray-300 px-6 justify-center">
            <span className="text-sm text-gray-500 mb-2">Location</span>
            <select
              className="bg-white text-lg outline-none"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="">Select</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Type Selection */}
          <div className="flex flex-col w-full lg:w-48 h-24 border-b lg:border-b-0 lg:border-r border-gray-300 px-6 justify-center">
            <span className="text-sm text-gray-500 mb-2">Type</span>
            <select
              className="bg-white text-lg outline-none"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option value="">Select</option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col w-full lg:w-48 h-20 lg:h-24 border-r border-gray-300 px-6 justify-center">
            <span className="text-sm text-gray-500 mb-2">Start Date</span>
            <input
              type="date"
              className="bg-white text-lg outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-full lg:w-48 h-20 lg:h-24 border-gray-300 px-6 justify-center">
            <span className="text-sm text-gray-500 mb-2">End Date</span>
            <input
              type="date"
              className="bg-white text-lg outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="relative w-full lg:w-48 min-h-16 lg:min-h-24 px-6 bg-green-1000 font-semibold text-white overflow-hidden rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none group"
        >
          <span className="absolute inset-0 bg-secondary transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
          <span className="relative transition-colors duration-100">
            Explore
          </span>
        </button>
      </form>

      <Link href="/all-tours">
        <p className="text-white text-lg font-semibold text-center mt-6 hover:text-green-1000 transition-colors duration-1000">
          SEE ALL AVAILABLE GEARS
        </p>
      </Link>
    </div>
  );
}
