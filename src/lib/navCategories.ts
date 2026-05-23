export type NavCategory = {
  label: string;
  searchTerms: string[];
  showAll?: boolean;
  icon?: string;
};

export const NAV_CATEGORIES: Record<string, NavCategory> = {
  fresh: {
    label: "Fresh",
    searchTerms: ["clothing", "food", "grocery"],
    icon: "🌿",
  },
  "mx player": {
    label: "MX Player",
    searchTerms: ["electronics"],
    icon: "▶️",
  },
  sell: {
    label: "Sell",
    searchTerms: ["electronics", "clothing"],
  },
  "best sellers": {
    label: "Best Sellers",
    showAll: true,
    searchTerms: [],
    icon: "🏆",
  },
  "today's deals": {
    label: "Today's Deals",
    showAll: true,
    searchTerms: [],
    icon: "🔥",
  },
  mobiles: {
    label: "Mobiles",
    searchTerms: ["electronics", "phone", "mobile"],
    icon: "📱",
  },
  electronics: {
    label: "Electronics",
    searchTerms: ["electronics"],
    icon: "💻",
  },
  "customer service": {
    label: "Customer Service",
    showAll: true,
    searchTerms: [],
  },
  prime: {
    label: "Prime",
    searchTerms: ["electronics", "clothing"],
    icon: "⭐",
  },
  "home & kitchen": {
    label: "Home & Kitchen",
    searchTerms: ["home", "kitchen", "clothing"],
    icon: "🏠",
  },
  "new releases": {
    label: "New Releases",
    showAll: true,
    searchTerms: [],
    icon: "✨",
  },
  "amazon pay": {
    label: "Amazon Pay",
    searchTerms: ["electronics"],
    icon: "💳",
  },
  fashion: {
    label: "Fashion",
    searchTerms: ["men's clothing", "women's clothing", "clothing"],
    icon: "👗",
  },
  computers: {
    label: "Computers",
    searchTerms: ["electronics", "computer"],
    icon: "🖥️",
  },
  books: {
    label: "Books",
    searchTerms: ["jewelery", "electronics"],
    icon: "📚",
  },
  "men's clothing": {
    label: "Men's Clothing",
    searchTerms: ["men's clothing"],
    icon: "👔",
  },
  "women's clothing": {
    label: "Women's Clothing",
    searchTerms: ["women's clothing"],
    icon: "👚",
  },
  jewellery: {
    label: "Jewellery",
    searchTerms: ["jewelery"],
    icon: "💍",
  },
  "sports & fitness": {
    label: "Sports & Fitness",
    searchTerms: ["women's clothing", "electronics"],
    icon: "🏋️",
  },
  "health & beauty": {
    label: "Health & Beauty",
    searchTerms: ["electronics", "women's clothing"],
    icon: "💊",
  },
  "gifts & more": {
    label: "Gifts & More",
    showAll: true,
    searchTerms: [],
    icon: "🎁",
  },
};

export function resolveNavQuery(raw: string) {
  const decoded = decodeURIComponent(raw).replace(/\+/g, " ").trim();
  const key = decoded.toLowerCase();
  const mapped = NAV_CATEGORIES[key];

  if (mapped) {
    return {
      label: mapped.label,
      searchTerms: mapped.searchTerms,
      showAll: mapped.showAll ?? false,
      icon: mapped.icon,
    };
  }

  return {
    label: decoded,
    searchTerms: [decoded],
    showAll: false,
    icon: undefined,
  };
}

/** Returns all nav category keys as an array (useful for rendering nav bar) */
export function getNavCategoryKeys(): string[] {
  return Object.keys(NAV_CATEGORIES);
}
