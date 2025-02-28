"use client";
import { useState } from "react";
import { useFetchData } from "@/utils/fetchData";
import { ThreeDot } from "react-loading-indicators";
import AdventuresCard from "@/components/UI/AdventuresCard";

export default function Page() {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data: adventures, loading } = useFetchData(
    `allTours?adventures=true&page=${page.toString()}`,
  );

  if (loading) {
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
  }

  const hasMoreData = adventures && adventures.length === pageSize;

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-0 mt-16">
      {adventures.length == 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold mb-10 px-4 sm:px-8">
            no result found
          </h1>
        </div>
      ) : (
        <>
          <AdventuresCard adventures={adventures} hrefTo="adventures" />

          <div className="flex justify-center mt-8 space-x-6 items-center">
            <button
              className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-1000 transition-colors duration-300 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-xl font-semibold text-gray-900">
              Page {page}
            </span>
            <button
              className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-1000 transition-colors duration-300 disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMoreData}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
