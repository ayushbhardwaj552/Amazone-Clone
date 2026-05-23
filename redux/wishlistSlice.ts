import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/redux/index";

export interface WishlistItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
  rating?: { rate: number; count: number };
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;
export const getWishlist = (state: RootState) => {
  const wishlistState = state.wishlist as WishlistState | WishlistItem[] | undefined;
  if (!wishlistState) return [];
  if (Array.isArray(wishlistState)) return wishlistState;
  return wishlistState.items ?? [];
};
export default wishlistSlice.reducer;
