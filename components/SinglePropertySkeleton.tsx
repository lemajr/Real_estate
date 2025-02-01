import React from "react";

const SinglePropertySkeleton = () => {
  return (
    <section className="max-padd-container my-[99px]">
      {/* Image skeleton */}
      <div className="pb-2 relative">
        <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[600px] max-md:h-auto"></div>
      </div>

      {/* Content skeleton */}
      <div className="xl:flexBetween gap-8 px-8">
        {/* Left side skeleton */}
        <div className="flex-1">
          <div className="animate-pulse bg-gray-200 h-6 w-1/4 rounded my-1"></div>
          <div className="flexBetween">
            <div className="animate-pulse bg-gray-200 h-6 w-3/4 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-1/4 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-4 w-full rounded mt-2 mb-4"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
          <div className="flexStart gap-x-2 my-5">
            <div className="animate-pulse bg-gray-200 h-6 w-6 rounded-full"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-12 w-1/3 rounded-lg"></div>
        </div>

        {/* Right side skeleton (Map) */}
        <div className="flex-1">
          <div className="animate-pulse bg-gray-200 h-[400px] rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default SinglePropertySkeleton;