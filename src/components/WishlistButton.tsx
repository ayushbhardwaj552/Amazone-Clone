"use client";

import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getWishlist, toggleWishlist } from "../../redux/wishlistSlice";

type WishlistButtonProps = {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
    category?: string;
    rating?: { rate: number; count: number };
  };
  variant?: "icon" | "text";
  className?: string;
};

const WishlistButton = ({
  product,
  variant = "icon",
  className = "",
}: WishlistButtonProps) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(getWishlist);
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center gap-x-1 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors ${className}`}
      >
        {inWishlist ? (
          <IoHeart className="text-[#CC0C39] text-base" />
        ) : (
          <IoHeartOutline className="text-base" />
        )}
        <span>{inWishlist ? "Added to Wishlist" : "Add to Wishlist"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm transition-all hover:scale-110 ${className}`}
    >
      {inWishlist ? (
        <IoHeart className="text-[17px] text-[#CC0C39]" />
      ) : (
        <IoHeartOutline className="text-[17px] text-[#565959] hover:text-[#CC0C39]" />
      )}
    </button>
  );
};

export default WishlistButton;
