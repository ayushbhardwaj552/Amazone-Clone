"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

function OrderConfirmationRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      router.replace(`/orders/${orderId}?placed=true`);
    } else {
      router.replace("/orders");
    }
  }, [orderId, router]);

  return (
    <section className="min-h-screen bg-[#EAEDED] py-10">
      <p className="text-center text-sm text-[#565959]">Redirecting...</p>
    </section>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationRedirect />
    </Suspense>
  );
}
