"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { IoSearch, IoLocationOutline, IoCartOutline } from "react-icons/io5";
import { FaCaretDown, FaBars } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../hooks/useRedux";
import { getCart } from "../../redux/cartSlice";
import { getWishlist } from "../../redux/wishlistSlice";
import { useAuth } from "../../hooks/useAuth";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Jewelry", value: "jewelery" },
];

const subHeaderItems = [
  "Fresh",
  "MX Player",
  "Sell",
  "Best Sellers",
  "Today's Deals",
  "Mobiles",
  "Electronics",
  "Customer Service",
  "Prime",
  "Home & Kitchen",
  "New Releases",
  "Amazon Pay",
  "Fashion",
  "Computers",
  "Books",
];

const Header = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const router = useRouter();
  const cart = useAppSelector(getCart);
  const wishlist = useAppSelector(getWishlist);
  const { user, displayName, signOut } = useAuth();

  const searchHandler = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;
    if (selectedCategory !== "all") {
      router.push(`/search/${encodeURIComponent(selectedCategory)}?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/search/${encodeURIComponent(q)}`);
    }
  };

  const getUserName = () => {
    if (!user) return "Sign in";
    return displayName?.split(" ")[0] || "User";
  };

  const totalCartQuantity = (cart ?? []).reduce(
    (acc: number, item: any) => acc + (item.quantity || 0),
    0,
  );
  const wishlistCount = (wishlist ?? []).length;

  return (
    <header className="sticky top-0 z-40 w-full select-none font-sans">
      {/* ── Top bar ── */}
      <div className="bg-[#131921] px-2 sm:px-4 flex items-center gap-x-1 sm:gap-x-2 h-[60px] text-white text-xs">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex-shrink-0 flex items-center p-1.5 border border-transparent hover:border-white rounded cursor-pointer h-[50px] transition-all"
        >
          <div className="relative pt-1.5">
            <Image src={logo} alt="Amazon" width={90} height={26} className="object-contain" />
            <span className="absolute right-[-14px] top-[4px] text-[10px] text-[#febd69] font-medium">.in</span>
          </div>
        </div>

        {/* Deliver to */}
        <div className="hidden md:flex flex-shrink-0 flex-col items-start justify-center p-2 border border-transparent hover:border-white rounded cursor-pointer h-[50px] transition-all min-w-[90px]">
          <span className="text-[11px] text-[#ccc] pl-[18px] leading-none">Deliver to</span>
          <div className="flex items-center gap-x-0.5 leading-none mt-0.5">
            <IoLocationOutline className="text-base text-white" />
            <span className="text-sm font-bold tracking-tight">India</span>
          </div>
        </div>

        {/* Search bar */}
        <form
          onSubmit={searchHandler}
          className="flex-grow flex items-stretch h-[40px] rounded-md overflow-hidden bg-white mx-1 sm:mx-2 focus-within:ring-[3px] focus-within:ring-[#f3a847]"
        >
          {/* Category selector */}
          <div className="relative hidden sm:flex">
            <button
              type="button"
              onClick={() => setShowCatDropdown((v) => !v)}
              className="flex items-center bg-[#f3f3f3] hover:bg-[#dadada] text-[#555] px-2 text-[11px] border-r border-gray-300 rounded-l-md transition-colors font-medium whitespace-nowrap gap-x-1 min-w-[60px]"
            >
              <span className="max-w-[80px] truncate">
                {CATEGORIES.find((c) => c.value === selectedCategory)?.label ?? "All"}
              </span>
              <FaCaretDown className="text-[10px] text-gray-500 flex-shrink-0" />
            </button>
            {showCatDropdown && (
              <div className="absolute top-full left-0 mt-0.5 w-48 bg-white border border-gray-300 shadow-lg z-50 rounded-sm text-[13px] text-[#0F1111]">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => { setSelectedCategory(cat.value); setShowCatDropdown(false); }}
                    className={`block w-full text-left px-3 py-2 hover:bg-[#f3f3f3] ${selectedCategory === cat.value ? "font-bold" : ""}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-3 text-sm text-gray-900 outline-none w-full placeholder-gray-400"
            placeholder="Search Amazon.in"
            autoComplete="off"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] text-gray-800 px-4 sm:px-6 rounded-r-md transition-colors flex-shrink-0"
          >
            <IoSearch className="text-xl font-bold" />
          </button>
        </form>

        {/* Language & Country Flag Selector */}
        <div className="hidden xl:flex items-center gap-x-1 p-2 border border-transparent hover:border-white rounded cursor-pointer h-[50px] transition-all flex-shrink-0 self-center mt-1">
          {/* Vector Indian Flag matching Amazon India desktop layout */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 900 600" 
            className="w-[18px] h-[12px] flex-shrink-0 object-cover rounded-[1px] mr-0.5"
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
          <span className="text-sm font-bold leading-none self-end pb-0.5">EN</span>
          <FaCaretDown className="text-gray-400 text-[10px] self-end pb-0.5" />
        </div>

        {/* Account & Lists */}
        <div className="flex-shrink-0 border border-transparent hover:border-white rounded cursor-pointer h-[50px] flex items-center justify-center transition-all">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white font-normal p-1.5 h-auto flex flex-col items-start focus:bg-transparent data-[state=open]:bg-transparent transition-none">
                  <span className="text-[11px] text-[#ccc] leading-none">
                    Hello, {getUserName()}
                  </span>
                  <div className="flex items-center leading-none mt-1">
                    <span className="text-sm font-bold tracking-tight">Account & Lists</span>
                    <FaCaretDown className="ml-1 text-gray-400 text-[10px]" />
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-5 bg-white text-gray-900 border border-gray-200 rounded shadow-xl min-w-[260px] flex flex-col gap-y-3">
                  {!user ? (
                    <div className="flex flex-col items-center pb-3 border-b border-gray-100">
                      <Link
                        href="/signin"
                        className="block text-center w-full py-1.5 rounded-sm text-xs font-normal text-gray-900 border border-[#a88734] bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#eeb933]"
                      >
                        Sign in
                      </Link>
                      <span className="text-[11px] text-gray-600 mt-2">
                        New customer?{" "}
                        <Link href="/signup" className="text-[#007185] hover:text-orange-600 hover:underline">
                          Start here.
                        </Link>
                      </span>
                    </div>
                  ) : (
                    <div className="pb-2 border-b border-gray-100">
                      <p className="text-xs font-bold truncate text-gray-600">{user.email}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[13px] text-gray-700">
                    <div>
                      <p className="text-xs font-bold text-[#0F1111] mb-1.5">Your Lists</p>
                      <Link href="/wishlist" className="block py-0.5 hover:text-orange-600 hover:underline">
                        Your Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
                      </Link>
                      <Link href="/orders" className="block py-0.5 hover:text-orange-600 hover:underline">Your Orders</Link>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F1111] mb-1.5">Your Account</p>
                      <Link href="/" className="block py-0.5 hover:text-orange-600 hover:underline">Account</Link>
                      <Link href="/orders" className="block py-0.5 hover:text-orange-600 hover:underline">Returns</Link>
                    </div>
                  </div>

                  {user && (
                    <button
                      onClick={async () => { await signOut(); router.push("/signin"); }}
                      className="text-left text-xs font-semibold text-[#007185] hover:text-orange-600 border-t border-gray-100 pt-2.5 w-full mt-1"
                    >
                      Sign Out
                    </button>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Returns & Orders */}
        <button
          onClick={() => router.push("/orders")}
          className="hidden sm:flex flex-col items-start justify-center p-1.5 border border-transparent hover:border-white rounded cursor-pointer h-[50px] transition-all text-left bg-transparent flex-shrink-0"
        >
          <span className="text-[11px] text-[#ccc] leading-none">Returns</span>
          <span className="text-sm font-bold leading-none mt-1 tracking-tight">& Orders</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => router.push("/wishlist")}
          className="hidden lg:flex flex-col items-start justify-center p-1.5 border border-transparent hover:border-white rounded cursor-pointer h-[50px] transition-all text-left bg-transparent flex-shrink-0 relative"
        >
          <span className="text-[11px] text-[#ccc] leading-none">Your</span>
          <div className="flex items-center gap-x-1 leading-none mt-1">
            <IoHeartOutline className="text-lg" />
            {wishlistCount > 0 && (
              <span className="text-sm font-bold">{wishlistCount}</span>
            )}
          </div>
        </button>

        {/* Cart */}
        <div
          onClick={() => router.push("/cart")}
          className="flex items-end p-1.5 border border-transparent hover:border-white rounded cursor-pointer h-[50px] relative transition-all pb-1 flex-shrink-0"
        >
          <div className="relative flex items-center">
            <span className="absolute left-[12px] top-[-10px] text-[#f08804] font-bold text-[15px] leading-none min-w-[16px] text-center">
              {totalCartQuantity}
            </span>
            <IoCartOutline className="text-[38px]" />
          </div>
          <span className="text-sm font-bold tracking-tight mb-1 hidden sm:inline ml-0.5">Cart</span>
        </div>
      </div>

      {/* ── Sub-nav bar ── */}
      <div className="bg-[#232f3e] px-3 flex items-center justify-between text-white text-[13px] font-medium h-[39px] overflow-hidden">
        <div className="flex items-center gap-x-0.5 overflow-hidden h-full">
          <Link
            href="/products"
            className="flex items-center font-bold gap-x-1.5 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all h-[30px] whitespace-nowrap flex-shrink-0"
          >
            <FaBars className="text-sm" />
            <span>All</span>
          </Link>
          {subHeaderItems.map((item, index) => (
            <Link
              href={`/search/${encodeURIComponent(item.toLowerCase())}`}
              key={index}
              className="px-2 py-1 border border-transparent hover:border-white rounded transition-all whitespace-nowrap h-[30px] flex items-center flex-shrink-0 text-[13px]"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block font-semibold hover:text-[#febd69] cursor-pointer text-[13px] px-2 py-1 border border-transparent hover:border-white rounded flex-shrink-0 ml-2">
          Download the App
        </div>
      </div>
    </header>
  );
};

export default Header;