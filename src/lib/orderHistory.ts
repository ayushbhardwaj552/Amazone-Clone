import { PlacedOrder } from "./types/order";

export const ORDER_STORAGE_KEY = "amazon_clone_last_order";
export const ORDER_HISTORY_KEY = "amazon_clone_order_history";

/** Max number of orders to retain in local history */
const MAX_HISTORY_SIZE = 50;

export function saveOrderToHistory(order: PlacedOrder): void {
  if (typeof window === "undefined") return;

  // Always persist the latest order in sessionStorage for the confirmation page
  sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));

  try {
    const existing = JSON.parse(
      localStorage.getItem(ORDER_HISTORY_KEY) || "[]",
    ) as PlacedOrder[];
    const updated = [
      order,
      ...existing.filter((o) => o.orderId !== order.orderId),
    ].slice(0, MAX_HISTORY_SIZE);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // If parsing fails, reset with just the new order
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([order]));
  }
}

export function getOrderHistory(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(
      localStorage.getItem(ORDER_HISTORY_KEY) || "[]",
    ) as PlacedOrder[];
  } catch {
    return [];
  }
}

export function getOrderById(orderId: string): PlacedOrder | null {
  // Check persistent history first
  const fromHistory = getOrderHistory().find((o) => o.orderId === orderId);
  if (fromHistory) return fromHistory;

  // Fall back to session (covers same-tab confirmation flow)
  if (typeof window === "undefined") return null;
  try {
    const last = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (last) {
      const parsed = JSON.parse(last) as PlacedOrder;
      if (parsed.orderId === orderId) return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function getLastOrder(): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(ORDER_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

/** Removes a single order from history by orderId */
export function removeOrderFromHistory(orderId: string): void {
  if (typeof window === "undefined") return;
  const updated = getOrderHistory().filter((o) => o.orderId !== orderId);
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updated));
}

/** Clears all saved order history (useful for account sign-out) */
export function clearOrderHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ORDER_HISTORY_KEY);
  sessionStorage.removeItem(ORDER_STORAGE_KEY);
}

/**
 * Merges local and remote orders, deduplicating by orderId.
 * Remote orders take lower priority than local ones (local is source of truth).
 */
export function mergeOrders(
  localOrders: PlacedOrder[],
  remoteOrders: PlacedOrder[],
): PlacedOrder[] {
  const map = new Map<string, PlacedOrder>();
  // Remote first, then local overwrites — local wins on conflict
  [...remoteOrders, ...localOrders].forEach((order) => {
    map.set(order.orderId, order);
  });
  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
  );
}

/** Returns orders placed within the last N days */
export function getRecentOrders(days: number = 30): PlacedOrder[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return getOrderHistory().filter(
    (o) => new Date(o.placedAt).getTime() >= cutoff,
  );
}
