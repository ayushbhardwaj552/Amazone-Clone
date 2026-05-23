"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import {
  getOrderHistory,
  mergeOrders,
} from "@/lib/orderHistory";
import { PlacedOrder } from "@/lib/types/order";

const OrdersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const local = getOrderHistory();
      let remote: PlacedOrder[] = [];

      if (user?.email) {
        try {
          const { data } = await axios.get("/api/orders", {
            params: { email: user.email },
          });
          remote = data.orders || [];
        } catch {
          /* use local only */
        }
      }

      setOrders(mergeOrders(local, remote));
      setLoading(false);
    };

    load();
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-[#EAEDED] py-6">
      <div className="mx-auto w-[95%] max-w-[1200px]">
        <h1 className="text-2xl font-normal text-[#0F1111]">Your Orders</h1>
        <p className="mt-1 text-sm text-[#565959]">
          Click an order to view full details.
        </p>

        {loading ? (
          <p className="mt-8 text-sm text-[#565959]">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="mt-8 rounded-sm bg-white p-8 text-center shadow-sm">
            <p className="text-lg text-[#0F1111]">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-sm bg-[#FFD814] px-6 py-2 text-sm font-medium text-[#0F1111] hover:bg-[#F7CA00]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((order) => {
              const itemCount = order.items.reduce(
                (s, i) => s + i.quantity,
                0,
              );
              const previewImage = order.items[0]?.image;

              return (
                <li key={order.orderId}>
                  <button
                    type="button"
                    onClick={() => router.push(`/orders/${order.orderId}`)}
                    className="w-full rounded-sm border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-4">
                        {previewImage && (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-[#F7F8F8] p-1">
                            <img
                              src={previewImage}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-[#565959]">
                            Order placed{" "}
                            {new Date(order.placedAt).toLocaleDateString(
                              "en-IN",
                              { dateStyle: "medium" },
                            )}
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#B12704]">
                            {order.orderId}
                          </p>
                          <p className="mt-1 text-sm text-[#0F1111]">
                            {itemCount} {itemCount === 1 ? "item" : "items"} · ₹
                            {order.total.toLocaleString("en-IN")}
                          </p>
                          {order.items[0] && (
                            <p className="mt-1 line-clamp-1 text-xs text-[#565959]">
                              {order.items[0].title}
                              {order.items.length > 1 &&
                                ` + ${order.items.length - 1} more`}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#007185] hover:text-[#C7511F] sm:shrink-0">
                        View order details →
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
