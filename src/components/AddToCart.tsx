"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addToCart, getCart, setCartQuantity } from "../../redux/cartSlice";
import { useRouter } from "next/navigation";
import WishlistButton from "./WishlistButton";

const QUANTITY_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const AddToCart = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cart = useAppSelector(getCart);

  const cartItem = useMemo(
    () => cart.find((item: any) => item.id === product.id),
    [cart, product.id],
  );

  const [quantity, setQuantity] = useState(String(cartItem?.quantity ?? 1));

  React.useEffect(() => {
    if (cartItem) setQuantity(String(cartItem.quantity));
  }, [cartItem]);

  const handleAddToCart = () => {
    const qty = parseInt(quantity, 10);
    if (cartItem) {
      dispatch(setCartQuantity({ id: product.id, quantity: qty }));
    } else {
      dispatch(addToCart({ ...product, addQuantity: qty }));
    }
  };

  const handleBuyNow = () => {
    const qty = parseInt(quantity, 10);
    if (!cartItem) {
      dispatch(addToCart({ ...product, addQuantity: qty }));
    } else {
      dispatch(setCartQuantity({ id: product.id, quantity: qty }));
    }
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-y-2.5 w-full">
      {/* Quantity */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#0F1111]">Qty:</span>
        <Select value={quantity} onValueChange={setQuantity}>
          <SelectTrigger className="h-8 w-[72px] rounded border border-gray-400 bg-[#F0F2F2] text-[13px] shadow-sm hover:bg-[#E3E6E6] focus:ring-[#e77600]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {QUANTITY_OPTIONS.map((value) => (
              <SelectItem key={value} value={value} className="text-[13px]">
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {cartItem && (
        <p className="text-[12px] font-semibold text-[#007600]">
          {cartItem.quantity} already in cart
        </p>
      )}

      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        className="w-full rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-normal text-[13px] h-9 border border-[#FCD200] shadow-sm transition-colors"
      >
        {cartItem ? "Update Cart" : "Add to Cart"}
      </Button>

      {/* Buy Now */}
      <Button
        onClick={handleBuyNow}
        className="w-full rounded-full bg-[#FFA41C] hover:bg-[#FF8F00] text-[#0F1111] font-normal text-[13px] h-9 border border-[#FF8C00] shadow-sm transition-colors"
      >
        Buy Now
      </Button>

      {/* Prime */}
      <div className="flex items-center gap-x-1.5 pt-1">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
          width={32}
          height={16}
          alt="Prime"
        />
        <span className="text-[12px] text-[#007185]">FREE One-Day Delivery</span>
      </div>

      <div className="flex flex-col gap-y-1 border-t border-gray-200 pt-2.5 text-[12px] text-[#565959]">
        <div className="flex items-center justify-between">
          <WishlistButton product={product} variant="text" />
          <span className="text-gray-300">|</span>
          <button type="button" className="text-[#007185] hover:text-[#c45500] hover:underline">Share</button>
        </div>
        <p className="text-[11px] text-[#565959] text-center mt-1">
          Secure transaction
        </p>
      </div>
    </div>
  );
};

export default AddToCart;
