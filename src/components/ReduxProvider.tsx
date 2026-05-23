"use client";
import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../../redux";
import { PersistGate } from "redux-persist/integration/react";

// Loading skeleton shown while redux-persist rehydrates the store.
// Kept intentionally minimal to avoid layout shift.
const PersistLoader = (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
  >
    <div className="flex flex-col items-center gap-3">
      {/* Amazon-style spinner */}
      <svg
        className="h-10 w-10 animate-spin text-[#FF9900]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-[13px] text-[#565959] tracking-wide">Loading…</span>
    </div>
  </div>
);

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={PersistLoader} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
