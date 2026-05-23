"use client";
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Ratings = ({ rating }: { rating: any }) => {
  let parsedRating = { rate: 0, count: 0 };

  if (rating) {
    if (typeof rating === "string") {
      try {
        parsedRating = JSON.parse(rating);
      } catch (e) {
        console.log("Error parsing rating string", e);
      }
    } else if (typeof rating === "object") {
      parsedRating = rating;
    }
  }

  const rate = Number(parsedRating.rate) || 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (rate >= starValue) {
      return <FaStar key={index} />;
    } else if (rate >= starValue - 0.5) {
      return <FaStarHalfAlt key={index} />;
    } else {
      return <FaRegStar key={index} className="text-gray-300" />;
    }
  });

  return (
    <div className="inline-flex items-center gap-x-1 select-none font-sans group cursor-pointer">
      {/* Star icons */}
      <div className="flex text-[#de7921] text-[14px] gap-x-[1px] leading-none">
        {stars}
      </div>

      {/* Rating number */}
      <span className="text-[13px] font-medium text-[#007185] group-hover:text-[#C7511F] group-hover:underline mt-px leading-none">
        {rate.toFixed(1)}
      </span>

      {/* Count if present */}
      {parsedRating.count > 0 && (
        <span className="text-[13px] text-[#007185] group-hover:text-[#C7511F] group-hover:underline mt-px leading-none">
          ({parsedRating.count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
};

export default Ratings;
