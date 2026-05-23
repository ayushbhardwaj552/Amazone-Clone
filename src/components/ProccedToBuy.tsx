"use client";
import React from "react";
import SubTotal from "./shared/SubTotal";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProccedToBuy = ({
  itemCount,
  subtotal,
  onCheckboxChange,
  hasItems,
}: {
  itemCount: number;
  subtotal: number;
  onCheckboxChange: (checked: boolean) => void;
  hasItems: boolean;
}) => {
  const router = useRouter();

  if (!hasItems) return null;

  return (
    <div className="h-fit w-full rounded-sm bg-white border border-gray-200 p-5 shadow-sm lg:sticky lg:top-[120px] lg:w-[320px] xl:w-[360px]">
      {/* Free delivery banner */}
      <div className="flex items-start gap-x-2 bg-[#DFF0D8] border border-[#D0E9C6] rounded-sm px-3 py-2 mb-4">
        <span className="text-[#3C763D] text-[13px] font-medium leading-snug">
          Your order qualifies for{" "}
          <span className="font-bold">FREE Delivery</span>.{" "}
          Choose this option at checkout.
        </span>
      </div>

      <SubTotal itemCount={itemCount} subtotal={subtotal} align="center" />

      {/* Gift option */}
      <div className="mt-4 flex items-start gap-2">
        <Checkbox
          id="order-gift"
          onCheckedChange={(checked) => onCheckboxChange(checked === true)}
        />
        <label htmlFor="order-gift" className="cursor-pointer text-[13px] leading-snug text-[#0F1111]">
          This order contains a gift
        </label>
      </div>

      {/* Proceed button */}
      <Button
        onClick={() => router.push("/checkout")}
        disabled={!hasItems}
        className="mt-4 w-full rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-normal text-[14px] h-10 border border-[#FCD200] shadow-sm transition-colors disabled:opacity-50"
      >
        Proceed to Buy ({itemCount} {itemCount === 1 ? "item" : "items"})
      </Button>

      <p className="mt-3 text-center text-[11px] text-[#565959]">
        The price and availability of items at Amazon.in are subject to change.
      </p>

      {/* EMI / Pay later */}
      <div className="mt-3 border-t border-gray-200 pt-3 text-[12px] text-[#007185] text-center hover:underline cursor-pointer">
        EMI available. No cost EMI options →
      </div>
    </div>
  );
};

export default ProccedToBuy;
