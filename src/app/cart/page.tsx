"use client";

import ProccedToBuy from "@/components/ProccedToBuy";
import ShoppingCart from "@/components/ShoppingCart";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { getCart } from "../../../redux/cartSlice";

const CartPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const cartItems = useAppSelector(getCart);

  const { subtotal, itemCount } = useMemo(() => {
    let total = 0;
    let count = 0;

    cartItems.forEach((item: any) => {
      if (item.price) {
        total += item.price * (item.quantity || 1);
        count += item.quantity || 1;
      }
    });

    return { subtotal: total, itemCount: count };
  }, [cartItems]);

  return (
    <section className="min-h-screen bg-[#EAEDED] py-6">
      <div className="mx-auto flex w-[98%] max-w-[1500px] flex-col items-start justify-between gap-5 px-2 lg:w-[95%] lg:flex-row">
        <ShoppingCart
          isChecked={isChecked}
          cartItems={cartItems}
          subtotal={subtotal}
          itemCount={itemCount}
        />
        <ProccedToBuy
          onCheckboxChange={setIsChecked}
          itemCount={itemCount}
          subtotal={subtotal}
          hasItems={cartItems.length > 0}
        />
      </div>
    </section>
  );
};

export default CartPage;
