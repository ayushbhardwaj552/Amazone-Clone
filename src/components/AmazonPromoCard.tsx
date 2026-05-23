"use client";

import { useRouter } from "next/navigation";

export type PromoTile = {
  label: string;
  image: string;
  href?: string;
};

type AmazonPromoCardProps = {
  title: string;
  tiles: PromoTile[];
  seeMoreLabel?: string;
  seeMoreHref?: string;
};

const AmazonPromoCard = ({
  title,
  tiles,
  seeMoreLabel = "See more",
  seeMoreHref = "/products",
}: AmazonPromoCardProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white p-4 shadow-sm min-h-[380px] hover:shadow-md transition-shadow">
      {/* Title */}
      <h2 className="mb-3 text-[17px] font-bold text-[#0F1111] leading-snug line-clamp-2">
        {title}
      </h2>

      {/* 2×2 tile grid */}
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {tiles.map((tile, i) => (
          <div
            key={i}
            onClick={() => router.push(tile.href || seeMoreHref)}
            className="group flex cursor-pointer flex-col gap-y-1"
          >
            <div className="flex h-[120px] items-center justify-center bg-[#F7F8F8] p-2 rounded-sm overflow-hidden">
              <img
                src={tile.image}
                alt={tile.label}
                className="h-[108px] w-auto max-w-full object-contain mix-blend-multiply transition duration-150 group-hover:scale-105"
              />
            </div>
            <span className="text-[12px] font-normal text-[#0F1111] leading-snug line-clamp-2 group-hover:text-[#C7511F] group-hover:underline">
              {tile.label}
            </span>
          </div>
        ))}
      </div>

      {/* See more link */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <span
          onClick={() => router.push(seeMoreHref)}
          className="cursor-pointer text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline font-medium"
        >
          {seeMoreLabel} →
        </span>
      </div>
    </div>
  );
};

export default AmazonPromoCard;
