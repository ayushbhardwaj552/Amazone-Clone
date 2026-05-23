export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  rating: {
    rate: number;
    count: number;
  };
  badge?: "Best Seller" | "New Arrival" | "Limited Deal" | "Amazon's Choice";
  inStock?: boolean;
  deliveryDays?: number;
}

export const mockProducts: Product[] = [
  // Men's Clothing
  {
    id: 1,
    title: "Men's Solid Slim Fit Cotton Casual Shirt",
    price: 899,
    originalPrice: 1299,
    description:
      "Breathable and premium cotton fabric casual shirt. Perfect for everyday wear, outdoor outings, or office styling. Features a modern slim fit layout with button closure and structured collar.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60"
    ],
    rating: { rate: 4.2, count: 120 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 2,
    title: "Men's Denim Jacket – Classic Regular Fit",
    price: 1899,
    originalPrice: 2799,
    description:
      "Classic denim jacket crafted from durable heavy-duty cotton. Features button cuffs, dual chest pockets, and side welt pockets. Pairs perfectly with casual tees and trousers.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 85 },
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 3,
    title: "Men's Premium Polo Neck T-Shirt",
    price: 699,
    originalPrice: 999,
    description:
      "Upgrade your casual look with this premium pique cotton knit polo shirt. Features a double-button placket, ribbed collar, and signature logo detail on chest.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.0, count: 310 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 4,
    title: "Men's Stretchable Slim Fit Denim Jeans",
    price: 1499,
    originalPrice: 1999,
    description:
      "Comfortable mid-rise slim fit jeans with added stretch for all-day comfort. Classic 5-pocket design with button fly and leather patch at back waistband.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.1, count: 155 },
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 17,
    title: "Men's Formal Regular Fit Blazer",
    price: 2799,
    originalPrice: 4499,
    description:
      "Sharply tailored single-button formal blazer in a premium polyester-viscose blend. Perfect for board meetings, interviews, and weddings. Fully lined with an inner pocket.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b984e?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 67 },
    badge: "New Arrival",
    inStock: true,
    deliveryDays: 5,
  },
  {
    id: 18,
    title: "Men's Striped Casual Cotton Shorts",
    price: 599,
    originalPrice: 899,
    description:
      "Lightweight, breathable cotton shorts with elastic waistband and drawstring. Side pockets and back patch pocket. Ideal for lounging, gym sessions, or casual outings.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 3.9, count: 204 },
    inStock: true,
    deliveryDays: 2,
  },

  // Women's Clothing
  {
    id: 5,
    title: "Women's Floral Print A-Line Midi Dress",
    price: 1299,
    originalPrice: 1899,
    description:
      "Charming floral printed crepe dress with a flattering A-line silhouette, square neck, and puff short sleeves. Ideal for brunch dates, summer outings, and casual parties.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 215 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 6,
    title: "Women's Oversized Knit Winter Sweater",
    price: 1999,
    originalPrice: 2999,
    description:
      "Cozy oversized knit sweater made from ultra-soft acrylic blend yarn. Ribbed cuffs, neckline, and hem. Keeps you warm and stylish throughout the chilly winter season.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 98 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 7,
    title: "Women's High Rise Stretchable Activewear Leggings",
    price: 999,
    originalPrice: 1499,
    description:
      "High-performance squat-proof leggings featuring a wide, high-rise waistband for tummy control. Made from sweat-wicking 4-way stretch fabric with side pockets.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 420 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 8,
    title: "Women's Linen Blend Casual Blazer",
    price: 2499,
    originalPrice: 3499,
    description:
      "Sophisticated single-breasted blazer in light linen-cotton blend fabric. Features notched lapels, functional front pockets, and a clean structured shoulder look.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 74 },
    inStock: true,
    deliveryDays: 5,
  },
  {
    id: 19,
    title: "Women's Embroidered Anarkali Kurta",
    price: 1699,
    originalPrice: 2499,
    description:
      "Elegant floor-length Anarkali kurta in soft georgette fabric with intricate thread embroidery on the yoke. Comes with a matching dupatta. Perfect for festivals and functions.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b984e?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 189 },
    badge: "New Arrival",
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 20,
    title: "Women's Structured Tote Bag – Vegan Leather",
    price: 1499,
    originalPrice: 2199,
    description:
      "Premium faux-leather tote bag with a spacious main compartment, zip inner pocket, and magnetic snap closure. Adjustable shoulder strap included. Ideal for office and daily use.",
    category: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.1, count: 137 },
    inStock: true,
    deliveryDays: 3,
  },

  // Electronics
  {
    id: 9,
    title: "Noise Cancelling Wireless Bluetooth Headphones",
    price: 4999,
    originalPrice: 7999,
    description:
      "Premium over-ear headphones with Active Noise Cancellation (ANC). Enjoy crystal clear audio, deep bass, 40 hours of battery life, and rapid charge capability.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60"
    ],
    rating: { rate: 4.7, count: 1840 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 10,
    title: 'Smartwatch with 1.83" HD Display & SpO2 Tracker',
    price: 2999,
    originalPrice: 4999,
    description:
      "Stay connected with Bluetooth calling directly from your wrist. Features 24/7 heart rate monitoring, blood oxygen tracker, sleep analysis, and over 100 sports modes.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60"
    ],
    rating: { rate: 4.3, count: 950 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 11,
    title: "Portable Waterproof Bluetooth Speaker (16W Bass)",
    price: 1999,
    originalPrice: 2999,
    description:
      "Unleash powerful room-filling sound with deep punchy bass. IPX7 waterproof certification makes it perfect for beach parties, poolside, or hiking. 12-hour playtime.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 1120 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 12,
    title: "Ergonomic Backlit Wireless Keyboard & Mouse Combo",
    price: 1599,
    originalPrice: 2299,
    description:
      "Slim profile rechargeable keyboard and mouse set. Low-profile whisper-quiet keys with customizable RGB backlighting. Multi-device connection via 2.4G and Bluetooth.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.1, count: 240 },
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 21,
    title: "20000mAh Fast Charging Power Bank (65W PD)",
    price: 2499,
    originalPrice: 3999,
    description:
      "High-capacity power bank with 65W USB-C Power Delivery for rapid charging. Charges laptops, tablets, and phones simultaneously. LED indicator with compact travel-friendly design.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 672 },
    badge: "Limited Deal",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 22,
    title: "4K Ultra HD Action Camera with Waterproof Case",
    price: 6999,
    originalPrice: 10999,
    description:
      "Capture stunning 4K30fps / 1080p60fps footage with electronic image stabilization. Comes with a waterproof case (30m), wide-angle lens, and Wi-Fi remote control.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 415 },
    badge: "New Arrival",
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 23,
    title: "True Wireless Earbuds with 30-Hour Total Playtime",
    price: 1799,
    originalPrice: 2999,
    description:
      "In-ear TWS earbuds featuring dual microphones for clear calls, touch controls, and IPX5 water resistance. Up to 7 hours per charge with 30 hours total via the charging case.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 880 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },

  // Jewellery
  {
    id: 13,
    title: "18k Gold Plated Heart Pendant Necklace",
    price: 599,
    originalPrice: 999,
    description:
      "Delicate and elegant necklace featuring an 18k gold plated heart pendant adorned with sparkling cubic zirconia crystals. Complete with adjustable lobster clasp chain.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 180 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 14,
    title: "Sterling Silver Classic Hoop Earrings Set",
    price: 799,
    originalPrice: 1299,
    description:
      "A set of three premium 925 sterling silver hoop earrings in varying sizes. Hypoallergenic, lightweight, and perfect for daily wear or stacking style.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 320 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 15,
    title: "Minimalist Adjustable Silver Cuff Bracelet",
    price: 1199,
    originalPrice: 1799,
    description:
      "Clean, classic, and sleek solid silver cuff bracelet. Fully adjustable to fit most wrist sizes. Can be worn solo or stacked with other bracelets.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 95 },
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 16,
    title: "Vintage Opal Stone Ring in Rose Gold",
    price: 1399,
    originalPrice: 2199,
    description:
      "Beautiful vintage-inspired statement ring highlighting a lab-created iridescent fire opal, set in a rose gold plated copper band with floral engravings.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 142 },
    badge: "New Arrival",
    inStock: true,
    deliveryDays: 4,
  },
  {
    id: 24,
    title: "Kundan Pearl Choker Necklace Set",
    price: 1899,
    originalPrice: 2999,
    description:
      "Traditional Kundan-style choker necklace with pearl drops and matching earrings. Crafted in gold-tone brass with a secure hook-and-eye closure. Perfect for ethnic occasions.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 211 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 25,
    title: "Men's Stainless Steel Chain Bracelet",
    price: 699,
    originalPrice: 1099,
    description:
      "Bold and durable 6mm stainless steel curb chain bracelet with a secure fold-over clasp. Tarnish-resistant and hypoallergenic. A minimalist accent for any outfit.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.0, count: 163 },
    inStock: true,
    deliveryDays: 3,
  },

  // ── Mobiles & Smartphones ──────────────────────────────────────────────────
  {
    id: 26,
    title: "OnePlus Nord CE 4 Lite 5G (8GB+128GB) – Mega Blue",
    price: 19999,
    originalPrice: 24999,
    description:
      "Powered by Snapdragon 695 5G, featuring a 6.67\" 120Hz AMOLED display, 50MP Sony AI camera, and a massive 5500mAh battery with 80W SUPERVOOC fast charging.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    ],
    rating: { rate: 4.4, count: 3210 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 27,
    title: "Samsung Galaxy M35 5G (6GB+128GB) – Thunder Grey",
    price: 18999,
    originalPrice: 23999,
    description:
      "6.6\" Super AMOLED+ 120Hz display, Exynos 1380 processor, 50MP triple rear camera with OIS, and 6000mAh battery. Android 14 with 4 years OS updates guaranteed.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 2580 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 28,
    title: "Redmi Note 13 Pro+ 5G (12GB+256GB) – Aurora Purple",
    price: 29999,
    originalPrice: 36999,
    description:
      "200MP OIS flagship camera, Dimensity 7200 Ultra chipset, 6.67\" curved AMOLED 1.5K display, and 120W HyperCharge. IP68 dust & water resistant.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 4120 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 29,
    title: "realme narzo 70 Pro 5G (8GB+128GB) – Submarine Blue",
    price: 17999,
    originalPrice: 21999,
    description:
      "Dimensity 6300 5G processor, 6.67\" AMOLED 120Hz display, 50MP Sony IMX890 camera, and 45W SUPERVOOC charging. Ideal for everyday power users.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.1, count: 1890 },
    inStock: true,
    deliveryDays: 2,
  },

  // ── Laptops & Computers ────────────────────────────────────────────────────
  {
    id: 30,
    title: "ASUS VivoBook 15 (2024) Intel Core i5 13th Gen Laptop",
    price: 49990,
    originalPrice: 65990,
    description:
      "15.6\" FHD IPS display, Intel Core i5-1335U, 16GB DDR4, 512GB NVMe SSD. Thin & light design at 1.7kg. Windows 11 Home with 1 year Microsoft 365 included.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    ],
    rating: { rate: 4.3, count: 2140 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 31,
    title: "Lenovo IdeaPad Slim 3 AMD Ryzen 5 15.6\" Laptop",
    price: 44990,
    originalPrice: 59990,
    description:
      "AMD Ryzen 5 7520U, 8GB LPDDR5, 512GB SSD, AMD Radeon Graphics. 15.6\" FHD Anti-Glare display. 2-cell 38Wh battery with Rapid Charge support.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 1760 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },

  // ── Smart Home & Appliances ────────────────────────────────────────────────
  {
    id: 32,
    title: "Amazon Echo Dot (5th Gen) with Alexa – Charcoal",
    price: 4499,
    originalPrice: 5999,
    description:
      "Compact smart speaker with improved bass and crisper highs. Built-in Alexa lets you play music, control smart home devices, set alarms, and get answers instantly.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 8920 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 33,
    title: "Fire TV Stick 4K (2nd Gen) with Alexa Voice Remote",
    price: 5999,
    originalPrice: 6999,
    description:
      "Supports 4K Ultra HD, Dolby Vision, HDR, HDR10+, and Dolby Atmos audio. Wi-Fi 6 connectivity. Stream Prime Video, Netflix, Disney+ Hotstar and 5000+ apps.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 12400 },
    badge: "Limited Deal",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 34,
    title: "Philips Smart LED Bulb 9W B22 (Pack of 4) – Warm White",
    price: 699,
    originalPrice: 1199,
    description:
      "Energy-efficient LED bulbs with 806 lumens brightness. Compatible with Amazon Alexa and Google Home via the Philips Hue app. 15,000-hour lifespan.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 3450 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },

  // ── Kitchen & Home ─────────────────────────────────────────────────────────
  {
    id: 35,
    title: "Prestige Iris 750W Mixer Grinder with 3 Jars",
    price: 2399,
    originalPrice: 3500,
    description:
      "750W motor with 3 stainless steel jars (0.4L chutney, 0.75L small, 1.5L large). 3 speed control + pulse. Overload protection, 5-year motor warranty.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 5670 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 36,
    title: "Pigeon by Stovekraft Healthifry Digital Air Fryer 4L",
    price: 2999,
    originalPrice: 5000,
    description:
      "4L capacity with digital touch panel, 8 preset cooking functions, and 360° rapid air circulation technology. Up to 70% less oil. Auto shut-off & cool-touch handle.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 7890 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 37,
    title: "Milton Thermosteel Flip Lid Flask 500ml – Silver",
    price: 499,
    originalPrice: 799,
    description:
      "Stainless steel inner & outer body. Keeps beverages hot for 24 hours and cold for 24 hours. Leak-proof flip lid, food-grade material, BPA-free.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 11200 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 1,
  },

  // ── Beauty & Personal Care ─────────────────────────────────────────────────
  {
    id: 38,
    title: "Mamaearth Vitamin C Face Wash with Turmeric 100ml",
    price: 249,
    originalPrice: 349,
    description:
      "Brightening face wash with Vitamin C & Turmeric to reduce dark spots and reveal glowing skin. Toxin-free formula, suitable for all skin types. Dermatologically tested.",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 14500 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 39,
    title: "Minimalist 2% Salicylic Acid Face Serum 30ml",
    price: 399,
    originalPrice: 549,
    description:
      "Targets acne, blackheads, and uneven texture. 2% Salicylic Acid with Hyaluronic Acid for deep pore-cleansing without stripping moisture. Alcohol-free, fragrance-free.",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 9800 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 40,
    title: "Philips BT1210/15 Cordless Beard Trimmer for Men",
    price: 1299,
    originalPrice: 1995,
    description:
      "Cordless trimmer with 5 length settings (0.5mm to 10mm), self-sharpening blades, 60-min runtime on full charge. Washable head, includes detail comb and full comb.",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 21300 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 1,
  },

  // ── Sports & Fitness ───────────────────────────────────────────────────────
  {
    id: 41,
    title: "Boldfit Adjustable Dumbbell Set 20kg with Rod",
    price: 1899,
    originalPrice: 2999,
    description:
      "Premium cast iron plates (2×1.25kg + 2×2.5kg + 2×5kg), 2 dumbbell rods with chrome spin-lock collars. Perfect for home gym. Anti-rust powder coating.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1517963879433-6ad2a56fcd82?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 4560 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 3,
  },
  {
    id: 42,
    title: "Strauss Anti-Skid Yoga Mat 6mm with Carry Bag – Purple",
    price: 699,
    originalPrice: 1299,
    description:
      "6mm thick EVA foam yoga mat with textured anti-skid surface. Lightweight at 1.2kg, moisture-resistant, easy to clean. Includes a free carry bag & strap.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.2, count: 8900 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 43,
    title: "Nivia Storm Football – Size 5, Black/Yellow",
    price: 599,
    originalPrice: 999,
    description:
      "32-panel machine-stitched football in PU material. FIFA-approved size & weight for official matches. Butyl bladder for excellent air retention. All-surface compatible.",
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.1, count: 3200 },
    inStock: true,
    deliveryDays: 2,
  },

  // ── Books ──────────────────────────────────────────────────────────────────
  {
    id: 44,
    title: "Atomic Habits by James Clear – Paperback",
    price: 399,
    originalPrice: 799,
    description:
      "The world's most popular guide to building good habits and breaking bad ones. Over 15 million copies sold. Packed with evidence-based strategies for real change.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.7, count: 31000 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 45,
    title: "The Psychology of Money by Morgan Housel – Paperback",
    price: 349,
    originalPrice: 599,
    description:
      "19 short stories exploring the weird ways people think about money. A New York Times bestseller. Essential reading on wealth, greed, and happiness.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 22500 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 46,
    title: "Rich Dad Poor Dad by Robert T. Kiyosaki – Paperback",
    price: 299,
    originalPrice: 499,
    description:
      "The #1 personal finance book of all time. Teaches the difference between working for money and making money work for you. Over 32 million copies sold worldwide.",
    category: "books",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.5, count: 41200 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 1,
  },

  // ── Grocery & Food ─────────────────────────────────────────────────────────
  {
    id: 47,
    title: "Tata Salt Lite (Low Sodium) – 1kg Pack",
    price: 35,
    originalPrice: 45,
    description:
      "Tata Salt Lite contains 15% less sodium than regular salt. Iodised and double-fortified with Iron for a healthier lifestyle. Ideal for low-sodium diets.",
    category: "grocery",
    image:
      "https://images.unsplash.com/photo-1584263347416-85a696b4eda7?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.4, count: 6700 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 1,
  },
  {
    id: 48,
    title: "Amul Butter (Unsalted) – 500g Tin",
    price: 285,
    originalPrice: 310,
    description:
      "Made from fresh cream, pasteurised and churned. Rich, creamy unsalted butter ideal for baking, cooking, and spreading. Refrigerate after opening.",
    category: "grocery",
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.6, count: 9100 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 1,
  },

  // ── Toys & Baby ────────────────────────────────────────────────────────────
  {
    id: 49,
    title: "LEGO Classic Large Creative Brick Box (484 pcs)",
    price: 3999,
    originalPrice: 5499,
    description:
      "484 classic LEGO bricks in 33 colours for endless creative building. Includes idea booklet with 8 models. For ages 4 and up. Compatible with all LEGO sets.",
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.7, count: 5600 },
    badge: "Best Seller",
    inStock: true,
    deliveryDays: 2,
  },
  {
    id: 50,
    title: "Funskool Ludo & Snakes Ladders Classic Board Game",
    price: 199,
    originalPrice: 299,
    description:
      "Classic family board game for 2-4 players. Includes 1 game board, 16 tokens, 2 dice, and instructions. Foldable for easy storage. Suitable for ages 5 and up.",
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&auto=format&fit=crop&q=60",
    rating: { rate: 4.3, count: 8800 },
    badge: "Amazon's Choice",
    inStock: true,
    deliveryDays: 2,
  },
];

/** Returns products filtered by category (case-insensitive substring match) */
export function getProductsByCategory(category: string): Product[] {
  const lower = category.toLowerCase();
  return mockProducts.filter((p) => p.category.toLowerCase().includes(lower));
}

/** Returns the discount percentage between originalPrice and price */
export function getDiscountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price)
    return null;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}
