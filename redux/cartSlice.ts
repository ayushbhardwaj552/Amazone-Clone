import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/redux/index";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  quantity: number;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { addQuantity = 1, ...product } = action.payload;
      const qtyToAdd = Math.max(1, Math.min(10, Number(addQuantity) || 1));
      const checkProductIsAdded = state.cart.find(
        (item) => item.id === product.id,
      );
      if (checkProductIsAdded) {
        checkProductIsAdded.quantity = Math.min(
          10,
          checkProductIsAdded.quantity + qtyToAdd,
        );
      } else {
        state.cart.push({ ...product, quantity: qtyToAdd });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product: any) => product.id !== action.payload.id,
      );
    },

    incrementQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item: any) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },

    decrementQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item: any) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },

    setCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item: any) => item.id === id);
      if (product) {
        product.quantity = Math.max(1, Math.min(10, Number(quantity)));
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCartQuantity,
  clearCart,
} = cartSlice.actions;
/** Supports legacy persist shape where `cart` was stored as a bare array. */
export const getCart = (state: RootState) => {
  const cartState = state.cart as CartState | Product[] | undefined;
  if (!cartState) return [];
  if (Array.isArray(cartState)) return cartState;
  return cartState.cart ?? [];
};
export default cartSlice.reducer;
