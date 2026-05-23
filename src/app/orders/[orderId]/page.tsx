"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../hooks/useAuth";
import OrderDetailView from "@/components/OrderDetailView";
import { getOrderById, getOrderHistory, mergeOrders } from "@/lib/orderHistory";
import { PlacedOrder } from "@/lib/types/order";

function OrderDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;
  const justPlaced = searchParams.get("placed") === "true";
  const emailSent = searchParams.get("email") === "sent";

  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const local = getOrderById(orderId);
    if (local) {
      setOrder(local);
      setLoading(false);
      return;
    }

    const loadRemote = async () => {
      if (user?.email) {
        try {
          const { data } = await axios.get("/api/orders", {
            params: { email: user.email },
          });
          const merged = mergeOrders(getOrderHistory(), data.orders || []);
          const found = merged.find((o) => o.orderId === orderId);
          if (found) {
            setOrder(found);
            setLoading(false);
            return;
          }
        } catch {
          /* fall through */
        }
      }
      setLoading(false);
    };

    loadRemote();
  }, [orderId, user?.email]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#EAEDED] py-10">
        <p className="text-center text-sm text-[#565959]">Loading order...</p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="min-h-screen bg-[#EAEDED] py-10">
        <div className="mx-auto max-w-lg rounded-sm bg-white p-8 text-center shadow-sm">
          <p className="text-lg text-[#0F1111]">Order not found</p>
          <Link
            href="/orders"
            className="mt-4 inline-block text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
          >
            Back to Your Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#EAEDED] py-6">
      <div className="mx-auto w-[95%] max-w-[900px]">
        <Link
          href="/orders"
          className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
        >
          ← Your Orders
        </Link>
        {emailSent && justPlaced && (
          <p className="mb-3 rounded-sm border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
            A confirmation email has been sent to {order.shippingAddress.email}.
          </p>
        )}
        <div className="mt-4">
          <OrderDetailView
            order={order}
            showSuccessBanner={justPlaced}
            backHref="/orders"
            backLabel="View all orders"
          />
        </div>
      </div>
    </section>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense fallback={null}>
      <OrderDetailContent />
    </Suspense>
  );
}
