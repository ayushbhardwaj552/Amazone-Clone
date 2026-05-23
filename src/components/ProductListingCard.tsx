"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../hooks/useRedux";
import { addToCart } from "../../redux/cartSlice";
import Ratings from "./Ratings";
import WishlistButton from "./WishlistButton";

const ProductListingCard = ({ product }: { product: any }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setQuantity(Number(e.target.value));
  };

  const mrp = product.originalPrice ?? Math.round(product.price * 1.3);
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div
      className="group flex h-full cursor-pointer flex-col bg-white border border-gray-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-shadow relative"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          -{discount}%
        </span>
      )}

      {/* Wishlist */}
      <div className="absolute top-1.5 right-1.5 z-10" onClick={(e) => e.stopPropagation()}>
        <WishlistButton product={product} />
      </div>

      {/* Image */}
      <div className="flex h-[200px] items-center justify-center bg-white p-5 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full max-h-[160px] w-auto object-contain mix-blend-multiply transition duration-200 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-3 pb-3 pt-2 border-t border-gray-100">
        <h2 className="line-clamp-2 text-[13px] font-normal leading-snug text-[#0F1111] group-hover:text-[#c45500] mb-1.5">
          {product.title}
        </h2>

        {product.rating && (
          <div className="flex items-center gap-x-1.5 mb-1.5">
            <Ratings rating={product.rating} />
            <span className="text-[12px] text-[#007185]">({product.rating.count})</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-1">
          <div className="flex items-baseline gap-x-1.5 flex-wrap">
            <span className="text-[#0F1111] flex items-start">
              <span className="text-xs align-top mt-0.5">₹</span>
              <span className="text-xl font-medium">{product.price.toLocaleString("en-IN")}</span>
            </span>
            <span className="text-[12px] text-[#565959] line-through">M.R.P. ₹{mrp.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-[11px] text-[#CC0C39] font-medium">({discount}% off)</p>
        </div>

        {/* Delivery */}
        <p className="text-[11px] text-[#007600] font-medium mb-2">
          FREE delivery <span className="font-bold text-[#0f1111]">Tomorrow</span>
        </p>

        {/* Prime */}
        <div className="flex items-center gap-x-1 mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
            width={28}
            alt="Prime"
            className="object-contain"
          />
          <span className="text-[11px] text-[#565959]">eligible</span>
        </div>

        {/* ── Quantity Selector ── */}
        <div
          className="flex items-center gap-x-2 mb-2"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="text-[12px] text-[#565959] whitespace-nowrap">Qty:</label>
          <select
            value={quantity}
            onChange={handleQtyChange}
            className="border border-gray-300 rounded-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] text-[12px] text-[#0F1111] px-1.5 py-0.5 outline-none focus:border-[#e77600] cursor-pointer shadow-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* ── Add to Cart ── */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-auto w-full rounded-full py-1.5 text-[13px] font-normal transition border shadow-sm ${
            addedToCart
              ? "bg-[#067D62] border-[#067D62] text-white"
              : "bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-[#0F1111]"
          }`}
        >
          {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductListingCard;
