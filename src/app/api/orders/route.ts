import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase/products";
import { sendOrderConfirmationEmail } from "@/lib/email/sendOrderEmail";
import { PlacedOrder } from "@/lib/types/order";

function generateOrderId() {
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${Date.now().toString(36).toUpperCase()}-${suffix}`;
}

function mapDbRowToOrder(row: Record<string, unknown>): PlacedOrder {
  return {
    orderId: String(row.order_id),
    items: (row.items as PlacedOrder["items"]) || [],
    shippingAddress:
      (row.shipping_address as PlacedOrder["shippingAddress"]) || {
        email: String(row.email || ""),
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        country: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
      },
    subtotal: Number(row.subtotal) || 0,
    deliveryFee: Number(row.delivery_fee) || 0,
    total: Number(row.total) || 0,
    placedAt: String(row.created_at || new Date().toISOString()),
  };
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ orders: [] });
  }

  const { data, error } = await supabase
    .from("Orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.log("Orders fetch skipped:", error.message);
    return NextResponse.json({ orders: [] });
  }

  const orders = (data || []).map((row) => mapDbRowToOrder(row));
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, subtotal, deliveryFee, total } = body;

    if (!items?.length || !shippingAddress) {
      return NextResponse.json(
        { error: "Cart items and shipping address are required" },
        { status: 400 },
      );
    }

    const orderId = generateOrderId();
    const placedAt = new Date().toISOString();

    const orderRecord = {
      order_id: orderId,
      email: shippingAddress.email,
      shipping_address: shippingAddress,
      items,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      status: "confirmed",
      created_at: placedAt,
    };

    const { error } = await supabase.from("Orders").insert(orderRecord);

    if (error) {
      console.log("Orders table insert skipped:", error.message);
    }

    const emailResult = await sendOrderConfirmationEmail({
      orderId,
      placedAt,
      items,
      shippingAddress,
      subtotal,
      deliveryFee,
      total,
    });

    if (!emailResult.sent) {
      console.error("Order email failed for order", orderId, emailResult.error);
    }

    return NextResponse.json({
      orderId,
      placedAt,
      subtotal,
      deliveryFee,
      total,
      items,
      shippingAddress,
      emailSent: emailResult.sent,
      emailMessage: emailResult.sent
        ? "Confirmation email sent"
        : emailResult.error,
    });
  } catch (error) {
    console.error("Place order error:", error);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 },
    );
  }
}
