import { ShippingAddress } from "./types/order";

export type ShippingFieldErrors = Partial<Record<keyof ShippingAddress, string>>;

/** Indian PIN codes are exactly 6 digits and start with a non-zero digit */
const INDIA_PINCODE_REGEX = /^[1-9]\d{5}$/;

/** Generic 5–10 digit postal code for non-India countries */
const GENERIC_POSTAL_REGEX = /^\d{5,10}$/;

/** E.164-style or 10-digit phone, ignoring spaces/dashes */
const PHONE_DIGITS_REGEX = /^\d{10}$/;

export function validateShippingAddress(
  address: ShippingAddress,
): ShippingFieldErrors {
  const errors: ShippingFieldErrors = {};

  // Email
  if (!address.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  // First name
  if (!address.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (address.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last name
  if (!address.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (address.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Address line
  if (!address.address.trim()) {
    errors.address = "Address is required";
  } else if (address.address.trim().length < 5) {
    errors.address = "Enter a complete street address";
  }

  // City
  if (!address.city.trim()) {
    errors.city = "City is required";
  }

  // State / Province
  if (!address.state.trim()) {
    errors.state = "State / Province is required";
  }

  // Postal code — apply stricter rule for India
  if (!address.postalCode.trim()) {
    errors.postalCode = "ZIP / Postal code is required";
  } else {
    const isIndia = address.country?.toLowerCase() === "india";
    const cleaned = address.postalCode.trim();
    const valid = isIndia
      ? INDIA_PINCODE_REGEX.test(cleaned)
      : GENERIC_POSTAL_REGEX.test(cleaned.replace(/\s/g, ""));
    if (!valid) {
      errors.postalCode = isIndia
        ? "Enter a valid 6-digit PIN code"
        : "Enter a valid postal code";
    }
  }

  // Phone
  if (!address.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_DIGITS_REGEX.test(address.phone.replace(/\D/g, ""))) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  return errors;
}

/** Returns true if there are no validation errors */
export function isShippingAddressValid(address: ShippingAddress): boolean {
  return Object.keys(validateShippingAddress(address)).length === 0;
}
