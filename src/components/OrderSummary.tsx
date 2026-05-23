"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useAppSelector } from "../../hooks/useRedux";
import { getCart } from "../../redux/cartSlice";
import Image from "next/image";
import SubTotal from "./shared/SubTotal";
import { FaLock } from "react-icons/fa";

type OrderSummaryProps = {
  onPlaceOrder: () => void;
  isPlacing: boolean;
  placeOrderError?: string;
};

const OrderSummary = ({ onPlaceOrder, isPlacing, placeOrderError }: OrderSummaryProps) => {
  const cart = useAppSelector(getCart);

  const { subtotal, itemCount } = useMemo(() => {
    let total = 0;
    let count = 0;
    cart.forEach((item: any) => {
      if (item.price) {
        total += item.price * (item.quantity || 1);
        count += item.quantity || 1;
      }
    });
    return { subtotal: total, itemCount: count };
  }, [cart]);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-sm border border-gray-300 bg-white shadow-sm overflow-hidden">
        {/* Place order button at top (Amazon style) */}
        <div className="p-4 border-b border-gray-200">
          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={isPlacing || cart.length === 0}
            className="w-full rounded-full bg-[#FFD814] hover:bg-[#F7CA00] py-3 text-[14px] font-normal text-[#0F1111] border border-[#FCD200] shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPlacing ? "Placing your order..." : "Place your order"}
          </button>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-[#565959]">
            By placing your order, you agree to Amazon&apos;s{" "}
            <span className="text-[#007185] hover:underline cursor-pointer">privacy notice</span>{" "}
            and{" "}
            <span className="text-[#007185] hover:underline cursor-pointer">conditions of use</span>.
          </p>
        </div>

        {/* Order summary */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#0F1111] mb-3">Order Summary</h2>
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between text-[#565959]">
              <span>Items ({itemCount}):</span>
              <span className="text-[#0F1111]">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-[#565959]">
              <span>Delivery:</span>
              <span className="text-[#007600] font-medium">FREE</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-[16px] font-bold text-[#B12704]">
              <span className="text-[#0F1111]">Order Total:</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {placeOrderError && (
          <div className="mx-4 my-3 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {placeOrderError}
          </div>
        )}

        {/* How are shipping costs calculated */}
        <div className="px-4 py-2 border-b border-gray-200">
          <span className="text-[12px] text-[#007185] hover:underline cursor-pointer">
            How are shipping costs calculated?
          </span>
        </div>

        {/* Cart items */}
        <div className="p-4">
          <h3 className="text-[13px] font-bold text-[#0F1111] mb-3">
            Estimated order ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h3>
          <ul className="divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
            {cart.map((cartItem: any) => {
              const lineTotal = (cartItem.price || 0) * (cartItem.quantity || 1);
              const title = cartItem.title || cartItem.name || "Product";
              return (
                <li key={cartItem.id} className="flex gap-3 py-3 first:pt-0">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-[#F7F8F8] border border-gray-100 p-1">
                    <Image
                      src={cartItem.image}
                      width={56}
                      height={56}
                      alt={title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${cartItem.id}`}
                      className="line-clamp-2 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline leading-snug"
                    >
                      {title}
                    </Link>
                    <p className="mt-0.5 text-[12px] text-[#007600] font-medium">In Stock</p>
                    <p className="text-[12px] text-[#565959]">Qty: {cartItem.quantity || 1}</p>
                    <p className="text-[13px] font-bold text-[#0F1111]">
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-x-1.5 bg-[#F7F8F8] px-4 py-2.5 border-t border-gray-200">
          <FaLock className="text-[#565959] text-[11px]" />
          <span className="text-[11px] text-[#565959]">Secure transaction</span>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
