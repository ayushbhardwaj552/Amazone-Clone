import React from "react";
import ProductListingCard from "./ProductListingCard";

function SearchResults({
  filterData,
  categoryLabel,
}: {
  filterData: any[];
  categoryLabel?: string;
}) {
  const resultCount = filterData.length;
  const label = categoryLabel ? `"${categoryLabel}"` : "";

  return (
    <section className="min-h-screen w-full bg-[#EAEDED] pb-10">
      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6">

        {/* Results header bar */}
        <div className="mb-3 bg-white px-4 py-3 shadow-sm border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <div>
            {categoryLabel && (
              <p className="text-[12px] text-[#565959] mb-0.5">
                1–{Math.min(resultCount, 60)} of {resultCount.toLocaleString("en-IN")} results for
              </p>
            )}
            <h1 className="text-[18px] sm:text-[20px] font-normal text-[#0F1111]">
              {categoryLabel ? (
                <>
                  <span className="text-[#CC0C39] font-normal">{label}</span>
                </>
              ) : (
                `${resultCount} result${resultCount !== 1 ? "s" : ""}`
              )}
            </h1>
          </div>

          {/* Sort (decorative — hook up if needed) */}
          <div className="flex items-center gap-x-2 text-[13px] text-[#0F1111]">
            <span className="text-[#565959]">Sort by:</span>
            <select className="border border-gray-300 rounded-sm px-2 py-1 text-[13px] bg-[#F3F3F3] hover:bg-[#e8e8e8] outline-none focus:border-[#e77600] cursor-pointer shadow-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {filterData.length === 0 ? (
          <div className="bg-white p-10 text-center shadow-sm border border-gray-200">
            <p className="text-[18px] font-normal text-[#0F1111]">
              No results for {label}
            </p>
            <p className="mt-2 text-[14px] text-[#565959]">
              Try checking your spelling or use more general terms.
            </p>
            <div className="mt-4 text-[14px] text-[#565959]">
              <p className="font-bold mb-1">Try:</p>
              <ul className="list-disc list-inside space-y-1 text-[#007185]">
                <li className="hover:underline cursor-pointer">Checking the spelling</li>
                <li className="hover:underline cursor-pointer">Using more general search terms</li>
                <li className="hover:underline cursor-pointer">Browsing all products</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filterData.map((product: any) => (
              <ProductListingCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
