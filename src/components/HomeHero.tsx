"use client";

import React, { useState, useEffect, useRef } from "react";

const HERO_BANNERS = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78270._CB785061629_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/74._CB783716748_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78269._CB785061629_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/Img26/Sports/February/GW/BAU/Legacy/Unrec/5298_Sports_-_BAU_PC_creatives_3000X1200_02._CB787728092_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Books/May26/Desktop_tall_Hero_3000x1200_Books-for-SSC-UPSC--more_rec._CB762894798_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/CEPC/Dec/amazonspecial/BFCM25_GW_PC_Hero._CB775393558_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/Siddhi/CBCC-PC_Hero_3000x1200_Prime_28thsept._CB576824032_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/Prime_LS_PC_Hero_AC_2x._CB579824355_.jpg",
];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_BANNERS.length);
    }, 4000);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const go = (dir: "prev" | "next") => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((c) =>
      dir === "prev"
        ? (c - 1 + HERO_BANNERS.length) % HERO_BANNERS.length
        : (c + 1) % HERO_BANNERS.length
    );
    if (!paused) startTimer();
  };

  return (
    <section
      className="relative w-full bg-[#131921] overflow-hidden select-none"
      onMouseEnter={() => { setPaused(true); if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={() => { setPaused(false); }}
    >
      {/* Banner images */}
      <div className="relative w-full h-[200px] sm:h-[280px] md:h-[360px] lg:h-[460px] xl:h-[500px]">
        {HERO_BANNERS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Amazon promotional banner"
            fetchPriority={i === 0 ? "high" : "low"}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
              maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
            }}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => go("prev")}
        aria-label="Previous banner"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-r-sm shadow-md opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4 text-[#0F1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => go("next")}
        aria-label="Next banner"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-l-sm shadow-md opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4 text-[#0F1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-x-1.5 z-10">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setCurrent(i);
              if (!paused) startTimer();
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
