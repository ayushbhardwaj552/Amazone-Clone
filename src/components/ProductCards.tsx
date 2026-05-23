"use client";
import Image from "next/image";
import React, { useState } from "react";
import Ratings from "./Ratings";
import { useRouter } from "next/navigation";
import WishlistButton from "./WishlistButton";
import { useAppDispatch } from "../../hooks/useRedux";
import { addToCart } from "../../redux/cartSlice";

const ProductCards = ({ product }: { product: any }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const priceParts = product.price.toString().split(".");
  const wholePrice = priceParts[0];
  const decimalPrice = priceParts[1] ?? "00";
  const mrp = product.originalPrice ?? Math.round(product.price * 1.3);
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="bg-white border border-gray-200 rounded-sm flex flex-col justify-between h-full cursor-pointer hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-shadow group select-none font-sans relative"
    >
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          -{discount}%
        </span>
      )}

      {/* Wishlist button */}
      <div className="absolute top-1.5 right-1.5 z-10" onClick={(e) => e.stopPropagation()}>
        <WishlistButton product={product} />
      </div>

      {/* Image */}
      <div className="w-full h-[200px] flex items-center justify-center overflow-hidden bg-white p-4 group-hover:scale-[1.02] transition-transform duration-200">
        <Image
          priority
          className="object-contain max-h-full max-w-full mix-blend-multiply"
          src={product.image}
          alt={product.title}
          width={180}
          height={180}
        />
      </div>

      <div className="px-3 pb-3 pt-2 flex flex-col gap-y-1 border-t border-gray-100">
        {/* Title */}
        <h2 className="text-[13px] font-normal text-[#0f1111] leading-snug line-clamp-2 group-hover:text-[#c45500]">
          {product.title}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-x-1.5 mt-0.5">
          <Ratings rating={product.rating} />
          <span className="text-[12px] text-[#007185] hover:text-[#c45500]">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        {/* Price block */}
        <div className="mt-1">
          <div className="flex items-baseline gap-x-1 flex-wrap">
            <span className="text-[#0f1111] flex items-start">
              <span className="text-xs font-normal mt-0.5 mr-0.5">₹</span>
              <span className="text-xl font-medium tracking-tight">{wholePrice}</span>
              {decimalPrice !== "00" && (
                <span className="text-xs font-normal mt-0.5">.{decimalPrice}</span>
              )}
            </span>
            <span className="text-[12px] text-[#565959] line-through">M.R.P. ₹{mrp}</span>
          </div>
        </div>

        {/* Delivery badge */}
        <div className="text-[11px] text-[#007600] font-medium mt-0.5">
          FREE delivery{" "}
          <span className="font-bold text-[#0f1111]">Tomorrow</span>
        </div>

        {/* Prime */}
        <div className="flex items-center gap-x-1 mt-0.5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
            width={28}
            height={14}
            alt="Prime"
            className="object-contain"
          />
          <span className="text-[11px] text-[#565959]">eligible</span>
        </div>

        {/* ── Quantity Selector ── */}
        <div
          className="flex items-center gap-x-2 mt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="text-[12px] text-[#565959] whitespace-nowrap">Qty:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded-sm bg-[#F0F2F2] hover:bg-[#E3E6E6] text-[12px] text-[#0F1111] px-1.5 py-0.5 outline-none focus:border-[#e77600] cursor-pointer shadow-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-2 w-full rounded-full py-1.5 text-[13px] font-normal transition border shadow-sm ${
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

export default ProductCards;
