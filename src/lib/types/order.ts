export interface ShippingAddress {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface OrderItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export interface PlacedOrder {
  orderId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  deliveryFee: number;
  total: number;
  placedAt: string;
  status?: OrderStatus;
  estimatedDelivery?: string;
  trackingNumber?: string;
  paymentMethod?: string;
}

export const emptyShippingAddress = (): ShippingAddress => ({
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  country: "India",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
});

/** Returns a human-readable label for an order status */
export function getOrderStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    confirmed: "Order Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    returned: "Returned",
  };
  return labels[status] ?? status;
}

/** Formats full name from a ShippingAddress */
export function getFullName(address: ShippingAddress): string {
  return `${address.firstName} ${address.lastName}`.trim();
}

/** Formats a single-line address from a ShippingAddress */
export function formatShippingAddress(address: ShippingAddress): string {
  const parts = [
    address.address,
    address.apartment,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  return parts.join(", ");
}
