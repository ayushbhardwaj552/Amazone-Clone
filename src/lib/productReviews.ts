export type ProductReview = {
  id: string;
  productId: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  verified?: boolean;
  helpfulCount?: number;
};

const STORAGE_KEY = "amazon_clone_product_reviews";

const SEED_REVIEWS: ProductReview[] = [
  {
    id: "seed-1",
    productId: 0,
    author: "Amazon Customer",
    rating: 5,
    title: "Great quality and fit",
    body: "Exactly as described. Fast delivery and comfortable fabric. Would definitely buy again. The stitching is clean and the material feels premium for the price.",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    verified: true,
    helpfulCount: 34,
  },
  {
    id: "seed-2",
    productId: 0,
    author: "Verified Buyer",
    rating: 4,
    title: "Good value for money",
    body: "Nice product at this price point. Sizing runs slightly small — consider going one size up. Overall happy with the purchase and would recommend it to others.",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    verified: true,
    helpfulCount: 18,
  },
  {
    id: "seed-3",
    productId: 0,
    author: "Rahul S.",
    rating: 5,
    title: "Exceeded expectations!",
    body: "Ordered on a Monday, delivered by Wednesday — super fast. The product quality is top-notch. Packaging was secure and the item was in perfect condition.",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    verified: true,
    helpfulCount: 22,
  },
  {
    id: "seed-4",
    productId: 0,
    author: "Priya M.",
    rating: 3,
    title: "Decent but room for improvement",
    body: "The product looks good in photos but the color is slightly different in person — a bit lighter. Function is fine and it works as expected, just manage your color expectations.",
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    verified: false,
    helpfulCount: 9,
  },
  {
    id: "seed-5",
    productId: 0,
    author: "Ankit T.",
    rating: 4,
    title: "Solid purchase",
    body: "Using it daily for 3 weeks and no complaints so far. Build quality is sturdy and it does exactly what it's supposed to. Would buy from this seller again.",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    verified: true,
    helpfulCount: 41,
  },
];

function readAll(): ProductReview[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    ) as ProductReview[];
  } catch {
    return [];
  }
}

function writeAll(reviews: ProductReview[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getReviewsForProduct(productId: number): ProductReview[] {
  const stored = readAll().filter((r) => r.productId === productId);
  const seeds = SEED_REVIEWS.filter((r) => r.productId === 0).map((r) => ({
    ...r,
    id: `${r.id}-${productId}`,
    productId,
  }));
  return [...stored, ...seeds].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function addProductReview(
  review: Omit<ProductReview, "id" | "createdAt">,
): ProductReview {
  const entry: ProductReview = {
    ...review,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString(),
    verified: false,
    helpfulCount: 0,
  };
  const all = readAll();
  writeAll([entry, ...all]);
  return entry;
}

export function markReviewHelpful(reviewId: string): void {
  const all = readAll();
  const updated = all.map((r) =>
    r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount ?? 0) + 1 } : r,
  );
  writeAll(updated);
}

export function deleteReview(reviewId: string): void {
  const all = readAll();
  writeAll(all.filter((r) => r.id !== reviewId));
}

export function getAverageRating(reviews: ProductReview[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/** Returns a breakdown of rating counts, e.g. { 5: 3, 4: 1, 3: 1, 2: 0, 1: 0 } */
export function getRatingBreakdown(
  reviews: ProductReview[],
): Record<number, number> {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    breakdown[star] = (breakdown[star] ?? 0) + 1;
  });
  return breakdown;
}
