import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const migrations: any = {
  1: (state: any) => {
    if (!state) return state;

    const next = { ...state };

    if (Array.isArray(state.cart)) {
      next.cart = { cart: state.cart };
    } else if (
      state.cart &&
      typeof state.cart === "object" &&
      !("cart" in (state.cart as object))
    ) {
      next.cart = { cart: [] };
    }

    if (Array.isArray(state.wishlist)) {
      next.wishlist = { items: state.wishlist };
    } else if (!state.wishlist) {
      next.wishlist = { items: [] };
    }

    return next;
  },
};

const rootReducer = combineReducers({
  cart: cartSlice,
  wishlist: wishlistSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "wishlist"],
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
