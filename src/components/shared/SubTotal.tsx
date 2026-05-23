import React from "react";

interface SubTotalProps {
  itemCount: number;
  subtotal: number;
  deliveryFee?: number;
  showOrderTotal?: boolean;
  align?: "left" | "right" | "center";
}

const SubTotal = ({
  itemCount,
  subtotal,
  deliveryFee = 0,
  showOrderTotal = true,
  align = "right",
}: SubTotalProps) => {
  const orderTotal = subtotal + deliveryFee;
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "left"
        ? "text-left"
        : "text-right";

  return (
    <div className={`space-y-2 text-sm text-[#0F1111] ${alignClass}`}>
      <p className="text-[15px]">
        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
        <span className="font-bold text-[#0F1111]">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>
      </p>

      <p className="flex items-center gap-1 text-[13px] text-[#007600] justify-end">
        <svg
          className="w-3.5 h-3.5 shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1L10.12 5.26L14.84 5.97L11.42 9.3L12.24 14L8 11.77L3.76 14L4.58 9.3L1.16 5.97L5.88 5.26L8 1Z"
            fill="#007600"
            stroke="#007600"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        Delivery:{" "}
        {deliveryFee === 0 ? (
          <span className="font-bold tracking-wide">FREE</span>
        ) : (
          <span className="font-bold">₹{deliveryFee.toLocaleString("en-IN")}</span>
        )}
      </p>

      {showOrderTotal && (
        <>
          <div className="border-t border-gray-200 pt-2 mt-1" />
          <p className="text-[16px] font-normal">
            Order Total:{" "}
            <span className="font-bold text-[#B12704] text-[17px]">
              ₹{orderTotal.toLocaleString("en-IN")}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default SubTotal;
