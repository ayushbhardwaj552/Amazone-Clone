"use client";
import Image from "next/image";
import React, { useState } from "react";
import Ratings from "./Ratings";
import AddToCart from "./AddToCart";
import WishlistButton from "./WishlistButton";
import ProductReviews from "./ProductReviews";
import { FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";

const SingleProduct = ({ singleProduct }: { singleProduct: any }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="w-full bg-[#EAEDED] min-h-screen py-3 select-none font-sans">
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4">
        {singleProduct.map((product: any) => {
          const originalmrp = Math.round(product.price * 1.25);
          const discountPercentage = 20;
          const mainImage = selectedImage || product.image;
          const images =
            product.images && product.images.length > 0
              ? product.images
              : [product.image, product.image, product.image];

          return (
            <div key={product.id}>
              {/* Breadcrumb */}
              <nav className="text-[12px] mb-2 flex flex-wrap gap-x-1 items-center py-1">
                <span className="hover:underline cursor-pointer text-[#007185]">Amazon.in</span>
                <span className="text-[#565959]">›</span>
                <span className="hover:underline cursor-pointer capitalize text-[#007185]">
                  {product.category}
                </span>
                <span className="text-[#565959]">›</span>
                <span className="text-[#0F1111] line-clamp-1">{product.title}</span>
              </nav>

              {/* Main product card */}
              <div className="bg-white border border-[#ddd] rounded-none grid grid-cols-1 md:grid-cols-12 gap-0 p-0">

                {/* ── Column 1: Image panel ── */}
                <div className="md:col-span-4 border-r border-[#ddd] p-4">
                  <div className="md:sticky md:top-4">

                    {/* Thumbnail strip */}
                    <div className="hidden sm:flex flex-col gap-1.5 float-left mr-3 mb-2">
                      {images.map((img: string, i: number) => {
                        const isActive =
                          selectedImage === img || (i === 0 && !selectedImage);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedImage(img)}
                            className={`w-[46px] h-[46px] flex items-center justify-center border rounded-[3px] p-[3px] bg-white transition-all ${
                              isActive
                                ? "border-[#e77600] ring-[1.5px] ring-[#e77600]"
                                : "border-[#ddd] hover:border-[#aaa]"
                            }`}
                          >
                            <img
                              src={img}
                              alt=""
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Main image */}
                    <div className="relative w-full aspect-square flex items-center justify-center bg-white overflow-hidden">
                      <Image
                        src={mainImage}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                        className="object-contain p-4 hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Action buttons below image */}
                    <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#ddd] clear-both">
                      <WishlistButton product={product} variant="text" />
                      <span className="text-[#ddd] text-sm">|</span>
                      <button className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline">
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Column 2: Product details ── */}
                <div className="md:col-span-5 border-r border-[#ddd] p-4 flex flex-col gap-y-0">

                  {/* Title */}
                  <h1 className="text-[17px] sm:text-[19px] font-normal text-[#0f1111] leading-[1.4] mb-2">
                    {product.title}
                  </h1>

                  {/* Brand */}
                  <p className="text-[13px] mb-2">
                    <span className="text-[#565959]">Visit the </span>
                    <span className="text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline font-normal">
                      Amazon Seller Store
                    </span>
                  </p>

                  {/* Ratings row */}
                  <div className="flex items-center gap-x-1.5 flex-wrap mb-1">
                    <Ratings rating={product.rating} />
                    <span className="text-[14px] text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
                      {product.rating?.count ?? 128} ratings
                    </span>
                    <span className="text-[#ccc] mx-1">|</span>
                    <span className="text-[14px] text-[#007185] hover:text-[#c45500] cursor-pointer hover:underline">
                      Search similar items
                    </span>
                  </div>

                  {/* Divider */}
                  <hr className="border-[#e7e7e7] my-3" />

                  {/* Price block */}
                  <div className="mb-3">
                    {/* Discount + price */}
                    <div className="flex items-baseline gap-x-2 flex-wrap">
                      <span className="text-[#CC0C39] text-[14px] font-medium">
                        -{discountPercentage}%
                      </span>
                      <span className="text-[28px] font-normal text-[#0f1111] flex items-start leading-none">
                        <span className="text-[14px] font-normal mt-[3px] mr-[1px]">₹</span>
                        <span>{product.price}</span>
                      </span>
                    </div>
                    {/* MRP */}
                    <p className="text-[13px] text-[#565959] mt-1">
                      M.R.P.:{" "}
                      <span className="line-through">₹{originalmrp}</span>
                    </p>
                    <p className="text-[12px] text-[#565959] mt-0.5">
                      Inclusive of all taxes
                    </p>

                    {/* EMI link */}
                    <p className="text-[13px] text-[#007185] hover:underline cursor-pointer mt-1">
                      EMI available. EMI starts at ₹{Math.round(product.price / 6)}/month
                    </p>

                    {/* Prime */}
                    <div className="flex items-center gap-x-1.5 mt-2">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
                        width={40}
                        height={16}
                        alt="Prime"
                        className="object-contain"
                      />
                      <span className="text-[13px] text-[#565959]">
                        FREE One-Day Delivery eligible
                      </span>
                    </div>
                  </div>

                  <hr className="border-[#e7e7e7] mb-3" />

                  {/* About this item */}
                  <div className="mb-3">
                    <h3 className="text-[16px] font-bold text-[#0f1111] mb-2">About this item</h3>
                    <p className="text-[14px] text-[#0f1111] leading-[1.6] whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#e7e7e7] mt-auto">
                    {[
                      {
                        icon: <FaTruck className="text-[#007600] text-[18px]" />,
                        label: "Free Delivery",
                        sub: "Tomorrow",
                      },
                      {
                        icon: <FaUndo className="text-[#007185] text-[18px]" />,
                        label: "Free Returns",
                        sub: "Within 30 days",
                      },
                      {
                        icon: <FaShieldAlt className="text-[#007185] text-[18px]" />,
                        label: "Secure",
                        sub: "100% Guaranteed",
                      },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center text-center gap-y-1 px-2"
                      >
                        {b.icon}
                        <span className="text-[11px] font-bold text-[#0F1111] leading-tight">
                          {b.label}
                        </span>
                        <span className="text-[10px] text-[#565959] leading-tight">
                          {b.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Column 3: Buy box ── */}
                <div className="md:col-span-3 p-4">
                  <div className="border border-[#ddd] rounded-[8px] p-4 bg-white flex flex-col gap-y-3">

                    {/* Price */}
                    <div className="text-[22px] font-normal text-[#0f1111] flex items-start leading-none">
                      <span className="text-[13px] font-normal mt-[2px] mr-[1px]">₹</span>
                      <span>{product.price}</span>
                    </div>

                    {/* Delivery */}
                    <p className="text-[13px] text-[#007600]">
                      FREE delivery{" "}
                      <span className="text-[#0f1111] font-bold">Tomorrow</span>
                      <br />
                      <span className="text-[#CC0C39]">Order within 4 hrs 30 mins.</span>
                    </p>

                    {/* Deliver to */}
                    <p className="text-[13px] text-[#565959]">
                      Deliver to{" "}
                      <span className="text-[#007185] hover:underline cursor-pointer font-medium">
                        India
                      </span>
                    </p>

                    {/* Stock */}
                    <p className="text-[17px] text-[#007600]">In Stock</p>

                    {/* Qty selector placeholder */}
                    <div>
                      <select
                        className="border border-[#888] rounded-[8px] text-[13px] px-2 py-1.5 bg-[#F0F2F2] cursor-pointer"
                        defaultValue="1"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            Qty: {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ships / sold by */}
                    <div className="text-[13px] grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 border-t border-b border-[#e7e7e7] py-2.5">
                      <span className="text-[#565959]">Ships from</span>
                      <span className="text-[#0f1111]">Amazon</span>
                      <span className="text-[#565959]">Sold by</span>
                      <span className="text-[#007185] hover:underline cursor-pointer">
                        RetailNet Pvt Ltd
                      </span>
                      <span className="text-[#565959]">Payment</span>
                      <span className="text-[#0f1111]">Secure transaction</span>
                    </div>

                    {/* CTA buttons */}
                    <AddToCart product={product} />
                  </div>

                  {/* Secure transaction notice */}
                  <p className="text-[12px] text-[#565959] mt-2 flex items-center gap-1">
                    <FaShieldAlt className="text-[#565959] text-[11px]" />
                    Your transaction is secure
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Reviews section */}
        {singleProduct.map((product: any) => (
          <ProductReviews
            key={`reviews-${product.id}`}
            productId={product.id}
            productTitle={product.title}
            baseRating={product.rating}
          />
        ))}
      </div>
    </main>
  );
};

export default SingleProduct;
