"use client";
import React, { useEffect } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import Ratings from "./Ratings";
import AmazonPromoCard from "./AmazonPromoCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const {
    getProductsofMens,
    mensClothing,
    getProductsofWomen,
    womenClothing,
    getDataFromSupabase,
    products,
  } = useSupabase();

  useEffect(() => {
    getProductsofMens();
    getProductsofWomen();
    getDataFromSupabase();
  }, [getProductsofMens, getProductsofWomen, getDataFromSupabase]);

  const mens = mensClothing.slice(0, 4);
  const womens = womenClothing.slice(0, 4);
  const electronics = products
    .filter((p: any) => p.category.toLowerCase().includes("electronics"))
    .slice(0, 4);
  const jewelry = products
    .filter((p: any) => p.category.toLowerCase().includes("jewelery"))
    .slice(0, 4);

  const applianceTiles = [
    { label: "Air conditioners", image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/AC/PC/AC_PC_1500x600._CB561300191_.jpg", href: "/search/electronics" },
    { label: "Refrigerators", image: "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Fresh/GW/Hero/April24/1/1st_Fresh_GW_Hero_PC1x_RC._CB561462241_.jpg", href: "/search/electronics" },
    { label: "Microwaves", image: "https://images-eu.ssl-images-amazon.com/images/G/31/img24/dell/hero/Tall_Hero_3000X1200_m16._CB561514648_.jpg", href: "/search/electronics" },
    { label: "Washing machines", image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/3000X1200_New_Launch_1stapr._CB561301598_.jpg", href: "/search/electronics" },
  ];

  const homeStyleTiles = [
    { label: "Cushion covers, bedsheets & more", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
    { label: "Figurines, vases & more", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
    { label: "Home storage", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
    { label: "Lighting solutions", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
  ];

  const essentialsTiles = [
    { label: "Cleaning supplies", image: "https://images.unsplash.com/photo-1563453392213-326a5a01c4ef?w=400&auto=format&fit=crop&q=60", href: "/search/fresh" },
    { label: "Bathroom accessories", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
    { label: "Home tools", image: "https://images.unsplash.com/photo-1504149902236-491c4aa1a6e0?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
    { label: "Wallpapers", image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&auto=format&fit=crop&q=60", href: "/search/home" },
  ];

  const automotiveTiles = [
    { label: "Cleaning accessories", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=60", href: "/search/automotive" },
    { label: "Tyre & rim care", image: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=400&auto=format&fit=crop&q=60", href: "/search/automotive" },
    { label: "Helmets", image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400&auto=format&fit=crop&q=60", href: "/search/automotive" },
    { label: "Vacuum cleaner", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&auto=format&fit=crop&q=60", href: "/search/automotive" },
  ];

  const babyCareTiles = [
    { label: "Baby diapers & wipes", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=60", href: "/search/baby" },
    { label: "Ride ons", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=60", href: "/search/baby" },
    { label: "RC cars", image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&auto=format&fit=crop&q=60", href: "/search/toys" },
    { label: "Baby safety essentials", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=60", href: "/search/baby" },
  ];

  // Real Harley X440 bikes from Amazon India
  const bikeProducts = [
    { name: "Harley-Davidson X440 S", color: "Denim Black", price: "₹2,29,000", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 Vivid", color: "Rebel Red", price: "₹2,39,000", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 S", color: "Fiery Orange", price: "₹2,29,000", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 Vivid", color: "Pearl White", price: "₹2,39,000", image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 S", color: "Gunmetal Grey", price: "₹2,29,000", image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 Vivid", color: "Matte Black", price: "₹2,39,000", image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&auto=format&fit=crop&q=80" },
    { name: "Harley-Davidson X440 S", color: "Midnight Blue", price: "₹2,29,000", image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&auto=format&fit=crop&q=80" },
  ];

  // Related items viewed — fridge/kitchen organizer type products to match real Amazon India screenshot
  const relatedViewedProducts = [
    { name: "Vasukie Divided Fridge Storage Boxes With 4 Serving Veggie Tray with Lid and Handle, Fridge...", rating: { rate: 4.4, count: 722 }, price: 798, originalPrice: 1999, badge: "", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&auto=format&fit=crop&q=60" },
    { name: "Fridge Storage Containers for Vegetables – 1200 ml (Pack of 6) | Refrigerato...", rating: { rate: 4.2, count: 2657 }, price: 278, originalPrice: 999, badge: "72% off", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=60" },
    { name: "Satpurush Fridge Storage Boxes- Kitchen Containers Set, Masala Box For Kitchen, Plastic Storage Box For Kitche...", rating: { rate: 3.8, count: 116 }, price: 454, originalPrice: 999, badge: "55% off", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=60" },
    { name: "Flexcube Fridge Storage Boxes Freezer Storage Containers, Container for Kitchen Storage Set, Storage in Kitchen,...", rating: { rate: 4.0, count: 282 }, price: 285, originalPrice: null, badge: "", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&auto=format&fit=crop&q=60" },
    { name: "FWQPRA Refrigerator Storage Box | Fridge Fresh Kitchen Organizer | Vegetable Fruit Boxes |...", rating: { rate: 4.3, count: 797 }, price: 999, originalPrice: null, badge: "", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=60" },
    { name: "SATVIKAYA Air Tight Plastic Storage Containers Set for...", rating: { rate: 4.2, count: 810 }, price: 389, originalPrice: 1999, badge: "#1 Best Seller", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=60" },
    { name: "MILTON Cryo Fridge Storage Boxes Set of 6 Fridge Organizer Container with...", rating: { rate: 4.3, count: 1594 }, price: 499, originalPrice: null, badge: "", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&auto=format&fit=crop&q=60" },
  ];

  const headphoneProducts = products.slice(0, 4).map((p: any) => ({
    label: p.title,
    image: p.image,
    href: `/product/${p.id}`,
  }));

  // Kitchen must-haves carousel products
  const kitchenProducts = [
    { name: "Bajaj Mixer Grinder 500W", price: 1299, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&auto=format&fit=crop&q=60" },
    { name: "Stainless Steel Casserole Set", price: 999, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&auto=format&fit=crop&q=60" },
    { name: "Premier Pressure Cooker 5L", price: 1499, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=60" },
    { name: "Voltas Beko 20L Microwave Oven", price: 6999, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&auto=format&fit=crop&q=60" },
    { name: "Borosil Lunch Box Set", price: 999, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=60" },
    { name: "AGARO Glass Gas Stove 2 Burner", price: 2999, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop&q=60" },
  ];

  const seeMoreLink =
    "text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium";

  const carouselCardBase =
    "cursor-pointer group flex flex-col h-full bg-white rounded-[3px] border border-transparent hover:border-[#ddd] hover:shadow-[0_2px_8px_rgba(15,17,17,.12)] transition-all duration-150 overflow-hidden";

  const productThumb =
    "flex h-[152px] items-center justify-center bg-[#F7F8F8] p-4 overflow-hidden";

  const dealBadge =
    "inline-flex items-center gap-1 bg-[#CC0C39] px-2 py-[3px] text-[11px] font-bold text-white rounded-[3px]";

  // ── Sub-components ──────────────────────────────────────────────

  const MiniProductGrid = ({
    items,
    onSeeMore,
    seeMoreLabel,
    title,
  }: {
    items: any[];
    onSeeMore: () => void;
    seeMoreLabel: string;
    title: string;
  }) => (
    <div className="flex flex-col h-full bg-white p-4 min-h-[380px] shadow-[0_1px_3px_rgba(15,17,17,.15)] rounded-[3px]">
      <h2 className="text-[17px] font-bold text-[#0F1111] mb-3 leading-snug line-clamp-2">{title}</h2>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => router.push(`/product/${item.id}`)} className="cursor-pointer group flex flex-col gap-1">
            <div className="bg-[#F7F8F8] flex items-center justify-center rounded-[3px] h-[120px] overflow-hidden hover:opacity-90 transition-opacity">
              <img src={item.image} alt={item.title} className="object-contain h-[104px] w-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
            </div>
            <span className="text-[12px] text-[#0F1111] line-clamp-2 leading-tight group-hover:text-[#C7511F] group-hover:underline">{item.title}</span>
            {item.price && <span className="text-[12px] font-bold text-[#B12704]">₹{item.price}</span>}
          </div>
        ))}
      </div>
      <span onClick={onSeeMore} className={seeMoreLink + " mt-3 block"}>{seeMoreLabel}</span>
    </div>
  );

  const PromoTileCard = ({
    title,
    tiles,
    seeMoreLabel = "See more",
    seeMoreHref,
  }: {
    title: string;
    tiles: { label: string; image: string; href: string }[];
    seeMoreLabel?: string;
    seeMoreHref: string;
  }) => (
    <div className="flex flex-col h-full bg-white p-4 min-h-[380px] shadow-[0_1px_3px_rgba(15,17,17,.15)] rounded-[3px]">
      <h2 className="text-[17px] font-bold text-[#0F1111] mb-3 leading-snug">{title}</h2>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {tiles.slice(0, 4).map((tile, i) => (
          <div key={i} onClick={() => router.push(tile.href)} className="cursor-pointer group flex flex-col gap-1">
            <div className="h-[120px] overflow-hidden rounded-[3px] bg-[#F7F8F8]">
              <img src={tile.image} alt={tile.label} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200" />
            </div>
            <span className="text-[12px] text-[#0F1111] font-medium leading-tight group-hover:text-[#C7511F] group-hover:underline line-clamp-2">{tile.label}</span>
          </div>
        ))}
      </div>
      <span onClick={() => router.push(seeMoreHref)} className={seeMoreLink + " mt-3 block"}>{seeMoreLabel}</span>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className="relative z-10 mx-auto mb-10 flex w-full max-w-[1500px] flex-col gap-3 px-3 pb-6 sm:px-4 -mt-[100px] sm:-mt-[120px] md:-mt-[150px] lg:-mt-[180px]">

      {/* ── Row 1: Four promo tile cards ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <PromoTileCard title="Appliances for your home | Up to 55% off" tiles={applianceTiles} seeMoreLabel="See more" seeMoreHref="/search/electronics" />
        <PromoTileCard title="Revamp your home in style" tiles={homeStyleTiles} seeMoreLabel="Explore all" seeMoreHref="/search/home" />
        <PromoTileCard title="Starting ₹49 | Deals on home essentials" tiles={essentialsTiles} seeMoreLabel="Explore all" seeMoreHref="/search/fresh" />
        {headphoneProducts.length >= 4 ? (
          <PromoTileCard title="Up to 75% off | Deals on headphones" tiles={headphoneProducts} seeMoreLabel="See all offers" seeMoreHref="/search/electronics" />
        ) : (
          <PromoTileCard title="Starting ₹199 | Amazon Brands & more" tiles={essentialsTiles} seeMoreHref="/products" />
        )}
      </div>

      {/* ── Row 2: Category product mini-grids ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MiniProductGrid title="Pick up where you left off" items={mens} onSeeMore={() => router.push("/search/men's clothing")} seeMoreLabel="See more in Men's clothing" />
        <MiniProductGrid title="Trending in Women's fashion" items={womens} onSeeMore={() => router.push("/search/women's clothing")} seeMoreLabel="See more in Women's fashion" />
        <MiniProductGrid title="Top picks in Electronics" items={electronics.length ? electronics : products.slice(0, 4)} onSeeMore={() => router.push("/search/electronics")} seeMoreLabel="Explore Electronics" />
        <MiniProductGrid title="Jewellery & accessories" items={jewelry.length ? jewelry : products.slice(0, 4)} onSeeMore={() => router.push("/search/jewelery")} seeMoreLabel="Shop Jewellery" />
      </div>

      {/* ── Bikes: Engineered for the road ── */}
      <div className="w-full bg-white rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] overflow-hidden">
        <div className="flex items-baseline gap-x-3 px-5 pt-4 pb-3 border-b border-[#e7e7e7]">
          <h2 className="text-[18px] font-bold text-[#0F1111]">
            Starting ₹70,348 | Engineered for the road
          </h2>
          <span
            onClick={() => router.push("/search/automotive")}
            className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium whitespace-nowrap"
          >
            See all offers
          </span>
        </div>

        <div className="relative px-2">
          <Carousel className="w-full">
            <CarouselContent className="-ml-0">
              {bikeProducts.map((bike, index) => (
                <CarouselItem
                  key={index}
                  className="pl-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 select-none"
                >
                  <div
                    onClick={() => router.push("/search/automotive")}
                    className="cursor-pointer group flex flex-col items-center px-3 py-5 hover:bg-[#FAFAFA] transition-colors duration-150"
                  >
                    <div className="relative w-full h-[170px] flex items-end justify-center overflow-visible">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="h-[155px] w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)] group-hover:scale-[1.04] transition-transform duration-300 ease-out"
                      />
                    </div>
                    <div className="mt-3 text-center w-full px-1">
                      <p className="text-[13px] font-semibold text-[#0F1111] leading-snug line-clamp-1 group-hover:text-[#C7511F] transition-colors">
                        {bike.name}
                      </p>
                      <p className="text-[11px] text-[#565959] mt-0.5">{bike.color}</p>
                      <p className="text-[13px] font-bold text-[#B12704] mt-1">{bike.price}</p>
                      <p className="text-[11px] text-[#007600] mt-0.5">FREE Delivery</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute left-1 top-[85px] -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_8px_rgba(15,17,17,.2)] h-12 w-8 rounded-r-[4px] rounded-l-none z-20 transition-all hover:shadow-lg" />
              <CarouselNext className="absolute right-1 top-[85px] -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_8px_rgba(15,17,17,.2)] h-12 w-8 rounded-l-[4px] rounded-r-none z-20 transition-all hover:shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* ── Row 3: Wide promo banner + two side cards ── */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {/* Prime Video banner */}
        <div className="col-span-1 md:col-span-2 relative h-[260px] bg-slate-900 overflow-hidden rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)]">
          <img alt="Prime Promo" src="/03.jpg" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 p-6 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 bg-[#00A8E1] text-white text-[10px] font-extrabold px-2.5 py-1 uppercase tracking-widest rounded-[3px] mb-3">Prime Video</span>
              <h2 className="text-[22px] font-bold text-white leading-snug">Recommended for you</h2>
              <p className="text-[13px] text-gray-300 mt-1">Inside Edge — Season 1 · Watch now</p>
            </div>
            <button onClick={() => router.push("/search/electronics")} className="w-fit bg-[#FFD814] text-[#0F1111] hover:bg-[#F7CA00] text-[13px] font-bold px-5 py-2 rounded-full transition-colors">
              Start watching with Prime
            </button>
          </div>
        </div>

        {/* GST savings card */}
        <div className="col-span-1 bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] flex flex-col justify-between min-h-[260px]">
          <div className="flex flex-col items-center justify-center gap-3 flex-1">
            <img src="/01.jpg" alt="GST savings" className="h-24 w-auto object-contain rounded-[3px]" />
            <div className="text-center">
              <h3 className="font-bold text-[#0F1111] text-[15px]">Save up to 28% with GST</h3>
              <p className="text-[12px] text-[#565959] mt-1 leading-relaxed">Claim input tax credit on business purchases</p>
            </div>
          </div>
          <button onClick={() => router.push("/search/electronics")} className="w-full text-center mt-4 bg-gradient-to-b from-[#FFE814] to-[#F0C14B] hover:from-[#F7D000] hover:to-[#e8b900] text-[13px] font-medium py-[7px] rounded-[20px] border border-[#D5D9D9] shadow-sm transition-all text-[#0F1111]">
            Register Business
          </button>
        </div>

        {/* Deal of the Day */}
        <div className="col-span-1 bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] flex flex-col justify-between min-h-[260px]">
          {products.slice(0, 1).map((item: any) => (
            <div key={item.id} className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#0F1111] text-[16px]">Deal of the Day</h3>
                  <span className="text-[11px] font-bold text-[#CC0C39] border border-[#CC0C39] px-2 py-0.5 rounded-[3px]">Limited</span>
                </div>
                <div onClick={() => router.push(`/product/${item.id}`)} className="cursor-pointer group flex flex-col items-center">
                  <div className="h-[110px] w-full flex items-center justify-center p-3 bg-[#F7F8F8] rounded-[3px] overflow-hidden mb-3">
                    <img src={item.image} alt={item.title} className="h-[90px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <p className="text-[13px] text-[#0F1111] font-medium line-clamp-2 text-center leading-snug group-hover:text-[#C7511F] w-full">{item.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-[16px] font-bold text-[#B12704]">₹{item.price}</span>
                    <span className="text-[12px] text-[#565959] line-through">₹{Math.round(item.price * 1.4)}</span>
                    <span className="text-[12px] font-bold text-[#CC0C39]">({Math.round(((item.price * 1.4 - item.price) / (item.price * 1.4)) * 100)}% off)</span>
                  </div>
                </div>
              </div>
              <span onClick={() => router.push(`/product/${item.id}`)} className={seeMoreLink + " mt-3"}>See deal details</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 4: More promo tile cards ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <PromoTileCard title="Automotive essentials | Up to 60% off" tiles={automotiveTiles} seeMoreLabel="See more" seeMoreHref="/search/automotive" />
        <PromoTileCard title="Up to 50% off | Baby care & toys | Amazon Brands" tiles={babyCareTiles} seeMoreLabel="See all offers" seeMoreHref="/search/toys" />

        {/* Keep shopping for */}
        <div className="bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] flex flex-col min-h-[380px]">
          <h2 className="text-[17px] font-bold text-[#0F1111] mb-3">Keep shopping for</h2>
          {products.slice(0, 1).map((item: any) => (
            <div key={item.id} className="flex flex-col gap-2 flex-1">
              <div onClick={() => router.push(`/product/${item.id}`)} className="cursor-pointer group flex-1">
                <div className="h-[180px] w-full bg-[#F7F8F8] rounded-[3px] overflow-hidden flex items-center justify-center mb-2">
                  <img src={item.image} alt={item.title} className="h-[160px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
                </div>
                <p className="text-[13px] text-[#0F1111] line-clamp-2 leading-snug group-hover:text-[#C7511F] group-hover:underline">{item.title}</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-[14px] font-bold text-[#B12704]">₹{item.price}</span>
                  {item.price && <span className="text-[12px] text-[#565959] line-through">₹{Math.round(item.price * 1.4)}</span>}
                </div>
              </div>
            </div>
          ))}
          <span onClick={() => router.push("/products")} className={seeMoreLink + " mt-auto pt-3"}>See more</span>
        </div>

        {/* Customers' Most-Loved */}
        <div className="bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] flex flex-col min-h-[380px]">
          <h2 className="text-[17px] font-bold text-[#0F1111] mb-3">Customers&apos; Most-Loved products</h2>
          <div className="flex flex-col gap-3 flex-1">
            {products.slice(0, 2).map((item: any) => (
              <div key={item.id} onClick={() => router.push(`/product/${item.id}`)} className="cursor-pointer group flex gap-3 items-start">
                <div className="h-[90px] w-[90px] flex-shrink-0 bg-[#F7F8F8] rounded-[3px] overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="h-[78px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-[13px] text-[#0F1111] line-clamp-3 leading-snug group-hover:text-[#C7511F] group-hover:underline">{item.title}</p>
                  <Ratings rating={item.rating} />
                  <span className="text-[13px] font-bold text-[#B12704]">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <span onClick={() => router.push("/products")} className={seeMoreLink + " mt-auto pt-3"}>Explore more</span>
        </div>
      </div>

      {/* ── Kitchen must-haves carousel ── */}
      <div className="w-full bg-white rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)] overflow-hidden">
        <div className="flex items-baseline gap-x-3 px-5 pt-4 pb-3 border-b border-[#e7e7e7]">
          <h2 className="text-[18px] font-bold text-[#0F1111]">Starting ₹999 | Kitchen must-haves at great prices</h2>
          <span onClick={() => router.push("/search/electronics")} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium whitespace-nowrap">See all offers</span>
        </div>
        <div className="relative px-2">
          <Carousel className="w-full">
            <CarouselContent className="-ml-0">
              {kitchenProducts.map((item, index) => (
                <CarouselItem key={index} className="pl-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 select-none">
                  <div onClick={() => router.push("/search/electronics")} className="cursor-pointer group flex flex-col items-center px-3 py-4 hover:bg-[#FAFAFA] transition-colors">
                    <div className="w-full h-[150px] flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt={item.name} className="h-[140px] w-auto object-contain group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <div className="mt-2 text-center w-full">
                      <p className="text-[12px] text-[#0F1111] line-clamp-2 leading-snug group-hover:text-[#C7511F]">{item.name}</p>
                      <p className="text-[13px] font-bold text-[#B12704] mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute left-1 top-[75px] -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_8px_rgba(15,17,17,.2)] h-12 w-8 rounded-r-[4px] rounded-l-none z-20" />
              <CarouselNext className="absolute right-1 top-[75px] -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_8px_rgba(15,17,17,.2)] h-12 w-8 rounded-l-[4px] rounded-r-none z-20" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* ── Today's Deals Carousel ── */}
      <div className="flex w-full flex-col bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)]">
        <div className="mb-4 flex items-center justify-between border-b border-[#e7e7e7] pb-3">
          <h2 className="text-[20px] font-bold text-[#0F1111] md:text-[22px] leading-tight">Today&apos;s Deals</h2>
          <span onClick={() => router.push("/search/electronics")} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium">See all deals →</span>
        </div>
        <Carousel className="w-full relative">
          <CarouselContent className="-ml-3">
            {products.map((product: any) => (
              <CarouselItem key={product.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 select-none">
                <div onClick={() => router.push(`/product/${product.id}`)} className={carouselCardBase}>
                  <div className={productThumb}>
                    <img src={product.image} alt={product.title} className="h-[120px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div className="p-3 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={dealBadge}>Up to 30% off</span>
                      {product.badge === "Limited Deal" && <span className="text-[11px] font-semibold text-[#CC0C39]">Limited time deal</span>}
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <p className="text-[15px] font-bold text-[#B12704]">₹{product.price}</p>
                      {product.originalPrice && <p className="text-[12px] text-[#565959] line-through">M.R.P: ₹{product.originalPrice}</p>}
                    </div>
                    <p className="text-[12px] text-[#0F1111] line-clamp-2 leading-[1.4]">{product.title}</p>
                    <p className="text-[11px] text-[#007600]">FREE Delivery</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
          </div>
        </Carousel>
      </div>

      {/* ── Customers Who Viewed Carousel ── */}
      <div className="flex w-full flex-col bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)]">
        <div className="mb-4 flex items-center justify-between border-b border-[#e7e7e7] pb-3">
          <div>
            <h2 className="text-[20px] font-bold text-[#0F1111] md:text-[22px] leading-tight">Customers who viewed items also viewed</h2>
            <p className="text-[13px] text-[#565959] mt-0.5">Page 1 of 4</p>
          </div>
          <span onClick={() => router.push("/products")} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium">See more →</span>
        </div>
        <Carousel className="w-full relative">
          <CarouselContent className="-ml-3">
            {products.map((product: any) => (
              <CarouselItem key={product.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 select-none">
                <div onClick={() => router.push(`/product/${product.id}`)} className="cursor-pointer group flex flex-col">
                  <div className="h-[160px] w-full bg-white flex items-center justify-center p-2 overflow-hidden">
                    <img src={product.image} alt={product.title} className="h-[140px] w-auto object-contain group-hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="flex flex-col gap-1 pt-2">
                    <p className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline line-clamp-2 leading-snug cursor-pointer">{product.title}</p>
                    <Ratings rating={product.rating} />
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      {product.originalPrice && (
                        <span className="text-[11px] bg-[#CC0C39] text-white font-bold px-1.5 py-0.5 rounded-[3px]">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                      )}
                      <span className="text-[15px] font-bold text-[#0F1111]">₹{product.price}</span>
                      {product.originalPrice && <span className="text-[12px] text-[#565959] line-through">M.R.P: ₹{product.originalPrice}</span>}
                    </div>
                    {product.badge === "Best Seller" && (
                      <span className="text-[11px] font-bold text-white bg-[#E77600] px-1.5 py-0.5 rounded-[3px] w-fit">#1 Best Seller</span>
                    )}
                    <p className="text-[12px] text-[#007600]">FREE Delivery by Amazon</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
          </div>
        </Carousel>
      </div>

      {/* ── NEW: Related to items you've viewed ── */}
      <div className="flex w-full flex-col bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)]">
        <div className="mb-4 flex items-center justify-between border-b border-[#e7e7e7] pb-3">
          <h2 className="text-[20px] font-bold text-[#0F1111] md:text-[22px] leading-tight">Related to items you&apos;ve viewed</h2>
          <span onClick={() => router.push("/products")} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium">See more</span>
        </div>
        <Carousel className="w-full relative">
          <CarouselContent className="-ml-3">
            {relatedViewedProducts.map((product, index) => (
              <CarouselItem key={index} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[14.28%] select-none">
                <div onClick={() => router.push("/products")} className="cursor-pointer group flex flex-col">
                  {/* Image — plain white background, no card box, matching Amazon screenshot */}
                  <div className="h-[180px] w-full bg-white flex items-center justify-center p-3 overflow-hidden border border-[#DDD] rounded-[3px] hover:border-[#aaa] transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[160px] w-full object-cover rounded-[2px] group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="flex flex-col gap-1 pt-2 px-0.5">
                    <p className="text-[13px] text-[#007185] group-hover:text-[#C7511F] group-hover:underline line-clamp-3 leading-snug cursor-pointer">{product.name}</p>
                    <Ratings rating={product.rating} />
                    <div className="flex items-baseline gap-1.5 flex-wrap mt-0.5">
                      {product.badge && product.badge.includes("off") && (
                        <span className="text-[11px] bg-[#CC0C39] text-white font-bold px-1.5 py-0.5 rounded-[3px]">{product.badge}</span>
                      )}
                      {product.badge === "#1 Best Seller" && (
                        <span className="text-[11px] font-bold text-white bg-[#E77600] px-1.5 py-0.5 rounded-[3px] w-fit">#1 Best Seller</span>
                      )}
                      <span className="text-[15px] font-bold text-[#0F1111]">₹{product.price.toLocaleString("en-IN")}<sup className="text-[10px]">00</sup></span>
                      {product.originalPrice && (
                        <span className="text-[12px] text-[#565959] line-through">M.R.P: ₹{product.originalPrice.toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    {product.badge === "72% off" || product.badge === "55% off" ? (
                      <span className="text-[11px] font-semibold text-[#CC0C39]">Limited time deal</span>
                    ) : null}
                    <p className="text-[11px] text-[#007600]">FREE Delivery by Amazon</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-0 top-[90px] -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
            <CarouselNext className="absolute right-0 top-[90px] -translate-y-1/2 translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
          </div>
        </Carousel>
      </div>

      {/* ── Best Sellers / Most-Loved Carousel ── */}
      <div className="flex w-full flex-col bg-white p-4 rounded-[3px] shadow-[0_1px_3px_rgba(15,17,17,.15)]">
        <div className="mb-4 flex items-center justify-between border-b border-[#e7e7e7] pb-3">
          <h2 className="text-[20px] font-bold text-[#0F1111] md:text-[22px] leading-tight">Customers&apos; Most-Loved products</h2>
          <span onClick={() => router.push("/search/women's clothing")} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer font-medium">Shop all →</span>
        </div>
        <Carousel className="w-full relative">
          <CarouselContent className="-ml-3">
            {products.slice().reverse().map((product: any) => (
              <CarouselItem key={product.id} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 select-none">
                <div onClick={() => router.push(`/product/${product.id}`)} className={carouselCardBase}>
                  <div className={productThumb}>
                    <img src={product.image} alt={product.title} className="h-[120px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div className="p-3 flex flex-col gap-1.5">
                    <Ratings rating={product.rating} />
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <p className="text-[15px] font-bold text-[#B12704]">₹{product.price}</p>
                      {product.originalPrice && <p className="text-[12px] text-[#565959] line-through">₹{product.originalPrice}</p>}
                    </div>
                    <p className="text-[12px] text-[#0F1111] line-clamp-2 leading-[1.4]">{product.title}</p>
                    <p className="text-[11px] text-[#007600]">FREE Delivery</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#F7F8F8] text-[#0F1111] border border-[#D5D9D9] shadow-[0_2px_5px_rgba(15,17,17,.15)] h-10 w-10 rounded-full z-20 transition-shadow hover:shadow-md" />
          </div>
        </Carousel>
      </div>

    </div>
  );
};

export default Category;
