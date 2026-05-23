"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSupabase } from "../../hooks/useSupabase";
import ProductListingCard from "./ProductListingCard";
import { FaChevronDown } from "react-icons/fa";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelry" },
];

const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "0-500", label: "Under ₹500" },
  { value: "500-2000", label: "₹500 – ₹2,000" },
  { value: "2000-5000", label: "₹2,000 – ₹5,000" },
  { value: "5000+", label: "Over ₹5,000" },
];

const ProductListing = () => {
  const { products, getDataFromSupabase } = useSupabase();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  useEffect(() => {
    getDataFromSupabase();
  }, [getDataFromSupabase]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product: any) => {
      const matchesName = !query || product.title?.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "all" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      let matchesPrice = true;
      if (selectedPrice !== "all") {
        const price = product.price ?? 0;
        if (selectedPrice === "0-500") matchesPrice = price < 500;
        else if (selectedPrice === "500-2000") matchesPrice = price >= 500 && price < 2000;
        else if (selectedPrice === "2000-5000") matchesPrice = price >= 2000 && price < 5000;
        else if (selectedPrice === "5000+") matchesPrice = price >= 5000;
      }
      return matchesName && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedPrice]);

  const hasFilters = searchQuery || selectedCategory !== "all" || selectedPrice !== "all";

  return (
    <div className="min-h-screen bg-[#EAEDED] pb-10">
      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6">

        {/* Page header */}
        <div className="mb-3 bg-white px-4 sm:px-5 py-3 shadow-sm border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-[20px] font-normal text-[#0F1111]">All Products</h1>
            <p className="text-[12px] text-[#565959] mt-0.5">
              {filteredProducts.length.toLocaleString("en-IN")} result{filteredProducts.length !== 1 ? "s" : ""}
              {searchQuery && (
                <> for <span className="font-bold text-[#0F1111]">"{searchQuery}"</span></>
              )}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-x-2 text-[13px]">
            <span className="text-[#565959]">Sort by:</span>
            <select className="border border-gray-300 rounded-sm px-2 py-1 text-[13px] bg-[#F3F3F3] hover:bg-[#e8e8e8] outline-none focus:border-[#e77600] cursor-pointer shadow-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-60 xl:w-64">
            <div className="bg-white shadow-sm border border-gray-200">
              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-[14px] font-bold text-[#0F1111] mb-2">Search</p>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-sm border border-gray-300 py-1.5 pl-3 pr-8 text-[13px] text-[#0F1111] outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                  <IoSearch className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565959] text-base" />
                </div>
              </div>

              {/* Category */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-[14px] font-bold text-[#0F1111] mb-2">Category</p>
                <ul className="space-y-1">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <li key={cat.value}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full text-left text-[13px] px-1 py-0.5 rounded-sm transition ${
                          selectedCategory === cat.value
                            ? "font-bold text-[#0F1111]"
                            : "text-[#007185] hover:text-[#C7511F] hover:underline"
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-[14px] font-bold text-[#0F1111] mb-2">Price</p>
                <ul className="space-y-1">
                  {PRICE_RANGES.map((range) => (
                    <li key={range.value}>
                      <button
                        type="button"
                        onClick={() => setSelectedPrice(range.value)}
                        className={`w-full text-left text-[13px] px-1 py-0.5 rounded-sm transition ${
                          selectedPrice === range.value
                            ? "font-bold text-[#0F1111]"
                            : "text-[#007185] hover:text-[#C7511F] hover:underline"
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avg Customer Review */}
              <div className="px-4 py-3">
                <p className="text-[14px] font-bold text-[#0F1111] mb-2">Avg. Customer Review</p>
                {[4, 3, 2, 1].map((stars) => (
                  <button key={stars} type="button" className="flex items-center gap-x-1.5 text-[#007185] hover:text-[#C7511F] w-full py-0.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < stars ? "text-[#FFA41C]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[13px]">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedPrice("all"); }}
                className="mt-2 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline px-4"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Product grid */}
          <section className="min-w-0 flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product: any) => (
                  <ProductListingCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 text-center shadow-sm border border-gray-200">
                <h3 className="text-[18px] font-normal text-[#0F1111]">No results found</h3>
                <p className="mt-2 text-[14px] text-[#565959]">
                  Try adjusting your search or filters.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedPrice("all"); }}
                  className="mt-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 text-[13px] font-normal text-[#0F1111] border border-[#FCD200]"
                >
                  View all products
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
