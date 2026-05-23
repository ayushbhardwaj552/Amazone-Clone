"use client";

import CheckOutForm from "@/components/CheckOutForm";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { clearCart, getCart } from "../../../redux/cartSlice";
import {
  emptyShippingAddress,
  PlacedOrder,
  ShippingAddress,
} from "@/lib/types/order";
import { validateShippingAddress } from "@/lib/validateShipping";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { saveOrderToHistory } from "@/lib/orderHistory";
import logo from "../../../public/logo.png";

const CheckOutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const { user } = useAuth();

  const [shipping, setShipping] = useState<ShippingAddress>(
    emptyShippingAddress(),
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingAddress, string>>
  >({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState("");

  const { subtotal, deliveryFee, total } = useMemo(() => {
    let sum = 0;
    cart.forEach((item: any) => {
      sum += (item.price || 0) * (item.quantity || 1);
    });
    const fee = 0;
    return { subtotal: sum, deliveryFee: fee, total: sum + fee };
  }, [cart]);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart");
    }
  }, [cart.length, router]);

  useEffect(() => {
    if (!user) return;

    setShipping((prev) => {
      const next = { ...prev };
      if (!next.email && user.email) next.email = user.email;
      const fullName = user.user_metadata?.full_name;
      if (fullName && !next.firstName && !next.lastName) {
        const parts = String(fullName).trim().split(" ");
        next.firstName = parts[0] || "";
        next.lastName = parts.slice(1).join(" ") || "";
      }
      return next;
    });
  }, [user]);

  const handleShippingChange = useCallback(
    (field: keyof ShippingAddress, value: string) => {
      setShipping((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handlePlaceOrder = async () => {
    const validationErrors = validateShippingAddress(shipping);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPlaceOrderError("Please complete the shipping address form.");
      return;
    }

    setIsPlacing(true);
    setPlaceOrderError("");

    try {
      const items = cart.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      const { data } = await axios.post("/api/orders", {
        items,
        shippingAddress: shipping,
        subtotal,
        deliveryFee,
        total,
      });

      const placedOrder: PlacedOrder = {
        orderId: data.orderId,
        items,
        shippingAddress: shipping,
        subtotal: data.subtotal,
        deliveryFee: data.deliveryFee,
        total: data.total,
        placedAt: data.placedAt,
      };

      saveOrderToHistory(placedOrder);
      dispatch(clearCart());
      const emailQuery = data.emailSent ? "&email=sent" : "";
      router.push(`/orders/${data.orderId}?placed=true${emailQuery}`);
    } catch {
      setPlaceOrderError("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <header className="border-b border-gray-300 bg-[#232F3E]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3">
          <Link href="/" className="relative flex items-center pt-1">
            <Image src={logo} alt="Amazon.in" width={90} height={26} />
            <span className="absolute -right-3 top-0 text-[10px] text-[#febd69]">
              .in
            </span>
          </Link>
          <h1 className="text-lg font-normal text-white">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-[#CCC]">
            <FaLock className="text-[#febd69]" />
            <span>Secure checkout</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <CheckOutForm
            shipping={shipping}
            onChange={handleShippingChange}
            errors={errors}
            onCancel={() => router.push("/cart")}
          />
          <OrderSummary
            onPlaceOrder={handlePlaceOrder}
            isPlacing={isPlacing}
            placeOrderError={placeOrderError}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
