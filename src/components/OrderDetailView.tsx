"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheckCircle, FaTruck, FaBox } from "react-icons/fa";
import { PlacedOrder } from "@/lib/types/order";

type OrderDetailViewProps = {
  order: PlacedOrder;
  showSuccessBanner?: boolean;
  backHref?: string;
  backLabel?: string;
};

const STEPS = ["Order placed", "Processing", "Shipped", "Out for delivery", "Delivered"];

const OrderDetailView = ({
  order,
  showSuccessBanner = false,
  backHref = "/orders",
  backLabel = "View all orders",
}: OrderDetailViewProps) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const estimatedDelivery = new Date(
    new Date(order.placedAt).getTime() + 3 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });

  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Success banner */}
      {showSuccessBanner && (
        <div className="mb-4 bg-white rounded-sm border border-gray-200 p-6 text-center shadow-sm">
          <FaCheckCircle className="text-5xl text-[#007600] mx-auto" />
          <h2 className="mt-3 text-2xl font-normal text-[#0F1111]">
            Thank you, your order has been placed!
          </h2>
          <p className="mt-2 text-[14px] text-[#565959]">
            Confirmation sent to{" "}
            <span className="font-medium">{order.shippingAddress.email}</span>
          </p>
        </div>
      )}

      {/* Order header */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden mb-4">
        <div className="bg-[#F7F8F8] px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-1 text-[13px]">
            <div>
              <p className="text-[#565959] uppercase text-[11px] font-bold tracking-wide">Order placed</p>
              <p className="text-[#0F1111]">
                {new Date(order.placedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
              </p>
            </div>
            <div>
              <p className="text-[#565959] uppercase text-[11px] font-bold tracking-wide">Total</p>
              <p className="text-[#0F1111]">₹{order.total.toLocaleString("en-IN")}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[#565959] uppercase text-[11px] font-bold tracking-wide">Ship to</p>
              <p className="text-[#007185] hover:underline cursor-pointer text-[13px]">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#565959]">Order # {order.orderId}</p>
            <button
              type="button"
              onClick={copyOrderId}
              className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline"
            >
              {copied ? "Copied!" : "Copy order ID"}
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Delivery status */}
          <div className="flex items-center gap-x-3 mb-4">
            <FaTruck className="text-[#007600] text-xl flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-[#007600]">Arriving {estimatedDelivery}</p>
              <p className="text-[13px] text-[#565959]">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
            </div>
            <span className="ml-auto bg-[#007600] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm">
              Confirmed
            </span>
          </div>

          {/* Progress tracker */}
          <div className="flex items-center justify-between mb-6 px-1">
            {STEPS.map((step, i) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i === 0 ? "bg-[#007600] border-[#007600]" : "bg-white border-gray-300"}`} />
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block absolute h-0.5 ${i === 0 ? "bg-[#007600]" : "bg-gray-200"}`} style={{ width: "calc(100% / 5 - 16px)" }} />
                )}
                <p className={`mt-1 text-[10px] text-center hidden sm:block ${i === 0 ? "text-[#007600] font-bold" : "text-[#565959]"}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Items list */}
          <ul className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4 first:pt-0">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-[#F7F8F8] border border-gray-100 p-2">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-[#007185] hover:text-[#C7511F] line-clamp-2 leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[12px] text-[#565959]">Qty: {item.quantity}</p>
                  <p className="mt-0.5 text-[14px] font-bold text-[#0F1111]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => router.push(`/product/${item.id}`)}
                    className="text-[13px] text-white bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] px-3 py-1 rounded-full shadow-sm font-normal"
                  >
                    Buy again
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Order summary & address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Shipping address */}
        {order.shippingAddress.address && (
          <div className="bg-white rounded-sm border border-gray-200 p-4 shadow-sm">
            <h3 className="text-[14px] font-bold text-[#0F1111] mb-2 pb-2 border-b border-gray-100">
              Shipping address
            </h3>
            <p className="text-[13px] text-[#0F1111] leading-relaxed">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}
              {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ""}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
            <p className="text-[12px] text-[#565959] mt-1">
              {order.shippingAddress.phone}
            </p>
          </div>
        )}

        {/* Payment & totals */}
        <div className="bg-white rounded-sm border border-gray-200 p-4 shadow-sm">
          <h3 className="text-[14px] font-bold text-[#0F1111] mb-2 pb-2 border-b border-gray-100">
            Order summary
          </h3>
          <div className="space-y-1.5 text-[13px]">
            <div className="flex justify-between text-[#565959]">
              <span>Items:</span>
              <span className="text-[#0F1111]">₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-[#565959]">
              <span>Delivery:</span>
              <span className="text-[#007600]">FREE</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-[#B12704] text-[15px]">
              <span className="text-[#0F1111]">Order Total:</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={backHref}
          className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 text-[13px] text-[#0F1111] shadow-sm"
        >
          {backLabel}
        </Link>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="rounded-full bg-[#FFD814] hover:bg-[#F7CA00] px-5 py-2 text-[13px] font-normal text-[#0F1111] border border-[#FCD200] shadow-sm"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetailView;
