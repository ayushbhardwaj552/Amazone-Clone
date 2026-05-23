"use client";

import React from "react";
import { ShippingAddress } from "@/lib/types/order";
import { ShippingFieldErrors } from "@/lib/validateShipping";
import { FaLock } from "react-icons/fa";

type CheckOutFormProps = {
  shipping: ShippingAddress;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  errors: ShippingFieldErrors;
  onCancel: () => void;
};

const labelClass = "block text-[13px] font-bold text-[#0F1111] mb-1";
const inputClass =
  "w-full rounded-sm border border-[#888C8C] px-3 py-2 text-[13px] text-[#0F1111] bg-white shadow-inner outline-none transition focus:border-[#e77600] focus:ring-2 focus:ring-[#e7770040]";
const inputErrorClass =
  "w-full rounded-sm border border-red-500 px-3 py-2 text-[13px] text-[#0F1111] bg-white shadow-inner outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100";

const CheckOutForm = ({ shipping, onChange, errors, onCancel }: CheckOutFormProps) => {
  const fieldClass = (field: keyof ShippingAddress) =>
    errors[field] ? inputErrorClass : inputClass;

  return (
    <div className="space-y-4">
      {/* Secure badge */}
      <div className="flex items-center gap-x-2 text-[12px] text-[#565959]">
        <FaLock className="text-[#565959]" />
        <span>All transactions are secure and encrypted.</span>
      </div>

      {/* Contact */}
      <section className="rounded-sm border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="bg-[#F7F8F8] px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#0F1111]">1 — Contact Information</h2>
        </div>
        <div className="p-5 max-w-md">
          <div>
            <label htmlFor="email" className={labelClass}>Email address</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={shipping.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              className={fieldClass("email")}
            />
            {errors.email && <p className="mt-1 text-[12px] text-red-600">{errors.email}</p>}
            <p className="mt-1.5 text-[12px] text-[#565959]">
              Order confirmation and delivery updates will be sent here.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="rounded-sm border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="bg-[#F7F8F8] px-5 py-3 border-b border-gray-200">
          <h2 className="text-[16px] font-bold text-[#0F1111]">2 — Shipping Address</h2>
          <p className="text-[12px] text-[#565959] mt-0.5">Use a permanent address where you can receive deliveries.</p>
        </div>

        <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className={labelClass}>First name</label>
            <input id="first-name" autoComplete="given-name" value={shipping.firstName} onChange={(e) => onChange("firstName", e.target.value)} className={fieldClass("firstName")} />
            {errors.firstName && <p className="mt-1 text-[12px] text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last-name" className={labelClass}>Last name</label>
            <input id="last-name" autoComplete="family-name" value={shipping.lastName} onChange={(e) => onChange("lastName", e.target.value)} className={fieldClass("lastName")} />
            {errors.lastName && <p className="mt-1 text-[12px] text-red-600">{errors.lastName}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className={labelClass}>Street address</label>
            <input id="address" autoComplete="street-address" value={shipping.address} onChange={(e) => onChange("address", e.target.value)} placeholder="House number, street name" className={fieldClass("address")} />
            {errors.address && <p className="mt-1 text-[12px] text-red-600">{errors.address}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="apartment" className={labelClass}>
              Apartment, suite, flat, etc.{" "}
              <span className="font-normal text-[#565959]">(optional)</span>
            </label>
            <input id="apartment" autoComplete="address-line2" value={shipping.apartment} onChange={(e) => onChange("apartment", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>Country / Region</label>
            <select id="country" value={shipping.country} onChange={(e) => onChange("country", e.target.value)} className={inputClass}>
              <option>India</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>City</label>
            <input id="city" autoComplete="address-level2" value={shipping.city} onChange={(e) => onChange("city", e.target.value)} className={fieldClass("city")} />
            {errors.city && <p className="mt-1 text-[12px] text-red-600">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="region" className={labelClass}>State / Province</label>
            <input id="region" autoComplete="address-level1" value={shipping.state} onChange={(e) => onChange("state", e.target.value)} className={fieldClass("state")} />
            {errors.state && <p className="mt-1 text-[12px] text-red-600">{errors.state}</p>}
          </div>
          <div>
            <label htmlFor="postal-code" className={labelClass}>PIN / Postal code</label>
            <input id="postal-code" autoComplete="postal-code" value={shipping.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} className={fieldClass("postalCode")} />
            {errors.postalCode && <p className="mt-1 text-[12px] text-red-600">{errors.postalCode}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className={labelClass}>Mobile number</label>
            <input id="phone" type="tel" autoComplete="tel" value={shipping.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="10-digit mobile number" className={fieldClass("phone")} />
            {errors.phone && <p className="mt-1 text-[12px] text-red-600">{errors.phone}</p>}
            <p className="mt-1 text-[12px] text-[#565959]">For delivery updates and issues.</p>
          </div>
        </div>
      </section>

      {/* Cancel */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline"
        >
          ← Cancel and return to cart
        </button>
      </div>
    </div>
  );
};

export default CheckOutForm;
