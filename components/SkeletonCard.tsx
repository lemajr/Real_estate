import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-[200px] w-full"></div>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

