"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { addToCart } from "../../../redux/cartSlice";
import { getWishlist, removeFromWishlist } from "../../../redux/wishlistSlice";
import WishlistButton from "@/components/WishlistButton";

const WishlistPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(getWishlist);

  return (
    <section className="min-h-screen bg-[#EAEDED] py-6">
      <div className="mx-auto w-[95%] max-w-[1200px]">
        <h1 className="text-2xl font-normal text-[#0F1111]">Your Wishlist</h1>
        <p className="mt-1 text-sm text-[#565959]">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>

        {wishlist.length === 0 ? (
          <div className="mt-8 rounded-sm bg-white p-8 text-center shadow-sm">
            <p className="text-lg text-[#0F1111]">Your wishlist is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-sm bg-[#FFD814] px-6 py-2 text-sm font-medium hover:bg-[#F7CA00]"
            >
              Discover products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-sm border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex justify-between">
                  <div
                    className="flex h-40 cursor-pointer items-center justify-center bg-[#F7F8F8] p-3"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <WishlistButton product={product} />
                </div>
                <h2
                  className="mt-3 line-clamp-2 cursor-pointer text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {product.title}
                </h2>
                <p className="mt-2 text-lg font-medium text-[#0F1111]">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(product))}
                    className="flex-1 rounded-sm bg-[#FFD814] py-2 text-xs font-medium hover:bg-[#F7CA00]"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(removeFromWishlist({ id: product.id }))
                    }
                    className="rounded-sm border border-gray-300 px-3 py-2 text-xs hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
