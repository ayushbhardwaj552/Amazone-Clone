"use client";

import React from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { removeFromCart, setCartQuantity } from "../../redux/cartSlice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SubTotal from "./shared/SubTotal";

const QUANTITY_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const ShoppingCart = ({
  cartItems,
  subtotal,
  itemCount,
  isChecked,
}: {
  cartItems: any[];
  subtotal: number;
  itemCount: number;
  isChecked: boolean;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuantityChange = (productId: number, newQuantity: string) => {
    dispatch(setCartQuantity({ id: productId, quantity: parseInt(newQuantity, 10) }));
  };

  return (
    <div className="w-full rounded-sm bg-white shadow-sm lg:flex-[2]">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-gray-200">
        <h1 className="text-2xl font-normal text-[#0F1111]">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <Link
            href="/products"
            className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline"
          >
            Deselect all items
          </Link>
        )}
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="hidden px-4 sm:px-6 py-2 border-b border-gray-200 text-right text-[13px] text-[#565959] sm:block">
            Price
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((product: any) => {
              const lineTotal = product.price * product.quantity;
              return (
                <div key={product.id} className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                    <Checkbox id={`cart-${product.id}`} className="mt-2 shrink-0" />

                    {/* Product image */}
                    <div
                      className="shrink-0 cursor-pointer"
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      <div className="flex h-28 w-28 items-center justify-center rounded bg-white border border-gray-100 p-2 sm:h-[140px] sm:w-[140px]">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <h2
                        onClick={() => router.push(`/product/${product.id}`)}
                        className="cursor-pointer text-[14px] sm:text-[15px] font-normal text-[#007185] hover:text-[#C7511F] hover:underline leading-snug line-clamp-2"
                      >
                        {product.title}
                      </h2>

                      {/* In stock */}
                      <p className="text-[13px] font-semibold text-[#007600]">In Stock</p>

                      {/* Eligible */}
                      <div className="flex items-center gap-x-1">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
                          width={28}
                          alt="Prime"
                          className="object-contain"
                        />
                        <span className="text-[11px] text-[#565959]">eligible</span>
                      </div>

                      <p className="text-[12px] text-[#007600]">FREE delivery on your order</p>

                      {/* Gift */}
                      <div className="flex items-center gap-2 pt-1">
                        <Checkbox id={`gift-${product.id}`} checked={isChecked} />
                        <label htmlFor={`gift-${product.id}`} className="text-[12px] text-[#0F1111] cursor-pointer">
                          This is a gift{" "}
                          <span className="text-[#007185] hover:underline">Learn more</span>
                        </label>
                      </div>

                      {/* Quantity + actions */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2">
                        <div className="flex items-center gap-x-2">
                          <span className="text-[12px] text-[#565959]">Qty:</span>
                          <Select
                            value={String(product.quantity)}
                            onValueChange={(value) => handleQuantityChange(product.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[72px] rounded border-gray-400 bg-[#F0F2F2] text-[13px] shadow-sm hover:bg-[#E3E6E6]">
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

                        <span className="text-gray-300 text-sm">|</span>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(product))}
                          className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline"
                        >
                          Delete
                        </button>
                        <span className="hidden text-gray-300 sm:inline text-sm">|</span>
                        <button type="button" className="hidden text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline sm:inline">
                          Save for later
                        </button>
                        <span className="hidden text-gray-300 sm:inline text-sm">|</span>
                        <button type="button" className="hidden text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline sm:inline">
                          Compare with similar items
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pl-10 sm:pl-0 text-left sm:text-right shrink-0">
                    <p className="text-[18px] font-bold text-[#0F1111]">
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </p>
                    {product.quantity > 1 && (
                      <p className="text-[12px] text-[#565959]">
                        ₹{product.price.toLocaleString("en-IN")} each
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 sm:px-6 border-t border-gray-200 py-4">
            <SubTotal itemCount={itemCount} subtotal={subtotal} align="right" />
          </div>
        </>
      ) : (
        <div className="px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-medium text-[#0F1111] mb-2">Your Amazon Cart is empty</h2>
              <p className="text-[14px] text-[#565959] max-w-md">
                Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, household supplies, electronics and more.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block rounded-full bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 text-[14px] font-normal text-[#0F1111] border border-[#FCD200] shadow-sm"
              >
                Continue shopping
              </Link>
            </div>
            <div className="hidden sm:block">
              <p className="text-[14px] text-[#565959] mb-2">
                Have a gift card or promotional code?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="border border-gray-300 px-3 py-1.5 text-[13px] rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] w-40"
                />
                <button
                  type="button"
                  className="border border-gray-300 bg-[#F0F2F2] hover:bg-[#E3E6E6] px-3 py-1.5 text-[13px] rounded-sm shadow-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
