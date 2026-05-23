"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { useAuth } from "../../hooks/useAuth";

const footerColumns = [
  {
    title: "Get to Know Us",
    links: [
      { label: "About Amazon", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press Releases", href: "/" },
      { label: "Amazon Science", href: "/" },
    ],
  },
  {
    title: "Connect with Us",
    links: [
      { label: "Facebook", href: "/" },
      { label: "Twitter", href: "/" },
      { label: "Instagram", href: "/" },
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      { label: "Sell on Amazon", href: "/products" },
      { label: "Sell under Amazon Accelerator", href: "/" },
      { label: "Protect and Build Your Brand", href: "/" },
      { label: "Amazon Global Selling", href: "/" },
      { label: "Supply to Amazon", href: "/" },
      { label: "Become an Affiliate", href: "/" },
      { label: "Fulfilment by Amazon", href: "/" },
      { label: "Advertise Your Products", href: "/" },
      { label: "Amazon Pay on Merchants", href: "/" },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { label: "Your Account", href: "/signin" },
      { label: "Returns Centre", href: "/orders" },
      { label: "Recalls and Product Safety Alerts", href: "/" },
      { label: "100% Purchase Protection", href: "/" },
      { label: "Amazon App Download", href: "/" },
      { label: "Help", href: "/" },
    ],
  },
];

const subBrands = [
  { name: "AbeBooks", desc: "Books, art\n& collectibles" },
  { name: "Amazon Web Services", desc: "Scalable Cloud\nComputing Services" },
  { name: "Audible", desc: "Download\nAudio Books" },
  { name: "IMDb", desc: "Movies, TV\n& Celebrities" },
  { name: "Shopbop", desc: "Designer\nFashion Brands" },
  { name: "Amazon Business", desc: "Everything For\nYour Business" },
  { name: "Amazon Prime Music", desc: "100 million songs, ad-free\nOver 15 million podcast episodes" },
];

const Footer = () => {
  const { user } = useAuth();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-auto w-full select-none font-sans">

      {/* ── 1. Sign-in personalisation banner (logged-out only) ── */}
      {!user && (
        <div className="w-full bg-white border-t border-[#dddddd] py-[16px] text-center">
          <div className="inline-flex flex-col items-center gap-y-[8px] min-w-[240px]">
            <p className="text-[13px] text-[#0f1111]">
              See personalised recommendations
            </p>
            <Link
              href="/signin"
              className="w-full text-center block rounded-[3px] border border-[#a88734] bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933] active:from-[#f0c14b] active:to-[#e59700] px-[12px] py-[8px] text-[13px] font-normal text-[#111] shadow-[0_1px_0_rgba(255,255,255,.4)_inset] leading-normal"
            >
              Sign in
            </Link>
            <p className="text-[12px] text-[#555555]">
              New customer?{" "}
              <Link
                href="/signup"
                className="text-[#007185] hover:text-[#c45500] hover:underline"
              >
                Start here.
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* ── 2. Back to top ── */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full block bg-[#37475a] hover:bg-[#3d5068] text-white text-[13px] text-center py-[14px] cursor-pointer transition-colors border-0"
      >
        Back to top
      </button>

      {/* ── 3. Main link columns ── */}
      <div className="bg-[#232f3e]">
        <div className="mx-auto max-w-[1100px] px-[24px] pt-[40px] pb-[36px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[32px] gap-y-[24px]">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[14px] font-bold text-white mb-[12px] leading-[20px]">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-y-[8px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#dddddd] hover:text-white leading-[19px] font-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Logo + selectors divider ── */}
        <div className="border-t border-[#3a4553]">
          <div className="mx-auto max-w-[1100px] px-[24px] py-[16px] flex items-center justify-center flex-wrap gap-x-[20px] gap-y-[12px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 border border-transparent hover:border-[#cccccc] rounded-[2px] px-[8px] py-[6px] transition-colors relative">
              <Image
                src={logo}
                alt="Amazon"
                width={80}
                height={24}
                className="object-contain"
              />
              <span className="absolute right-[2px] top-[6px] text-[10px] font-bold text-[#ff9900] leading-none">
                .in
              </span>
            </Link>

            {/* Language selector */}
            <button
              type="button"
              className="flex items-center gap-x-[6px] border border-[#848688] hover:border-[#cccccc] rounded-[2px] px-[10px] py-[6px] text-[13px] text-[#cccccc] hover:text-white transition-colors bg-transparent flex-shrink-0"
            >
              {/* Globe icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[15px] h-[15px] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="360"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span>EN</span>
              {/* Caret */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[10px] h-[10px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Country selector */}
            <button
              type="button"
              className="flex items-center gap-x-[6px] border border-[#848688] hover:border-[#cccccc] rounded-[2px] px-[10px] py-[6px] text-[13px] text-[#cccccc] hover:text-white transition-colors bg-transparent flex-shrink-0"
            >
              {/* Vector Indian Flag for consistent rendering on Windows/All Platforms */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 900 600" 
                className="w-[18px] h-[12px] flex-shrink-0 object-cover rounded-[1px]"
              >
                <rect width="900" height="200" fill="#f4c257" />
                <rect y="200" width="900" height="200" fill="#fff" />
                <rect y="400" width="900" height="200" fill="#056a38" />
                <g transform="translate(450,300)">
                  <circle r="92" fill="none" stroke="#000080" strokeWidth="6" />
                  <circle r="16" fill="#000080" />
                  {Array.from({ length: 24 }).map((_, i) => (
                    <g key={i} transform={`rotate(${i * 15})`}>
                      <line y2="-92" stroke="#000080" strokeWidth="4" />
                      <polygon points="0,-92 -6,-60 0,-16 6,-60" fill="#000080" />
                    </g>
                  ))}
                </g>
              </svg>
              <span>India</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[10px] h-[10px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── 5. Sub-brands ── */}
      <div className="bg-[#131a22]">
        <div className="mx-auto max-w-[1100px] px-[24px] py-[20px] border-b border-[#3a4553]">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-[20px] gap-y-[14px]">
            {subBrands.map((brand, idx) => (
              <Link
                href="/"
                key={idx}
                className="flex flex-col cursor-pointer group"
              >
                <span className="text-[12px] font-bold text-[#dddddd] group-hover:underline leading-[17px]">
                  {brand.name}
                </span>
                <span className="text-[11px] text-[#999999] leading-[15px] mt-[2px] whitespace-pre-line group-hover:underline">
                  {brand.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. Legal bar ── */}
      <div className="bg-[#131921] py-[20px] px-[16px]">
        <div className="mx-auto max-w-[1100px] flex flex-col items-center gap-y-[10px]">
          <div className="flex flex-wrap justify-center gap-x-[16px] gap-y-[6px]">
            {[
              "Conditions of Use & Sale",
              "Privacy Notice",
              "Interest-Based Ads",
            ].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-[12px] text-[#dddddd] hover:text-white hover:underline leading-[18px]"
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-[#999999] leading-[18px] text-center">
            © 1996–2026, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;