import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/entities/product";
import { CartItem } from "./types";
import {
  fetchDbCart,
  upsertDbCartItem,
  deleteDbCartItem,
  clearDbCart,
} from "../api/cartApi";

export interface CartState {
  items: CartItem[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoaded: false,
  loading: false,
  error: null,
};

// Async Thunks for database synchronization

export const fetchCartThunk = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string | null) => {
    if (userId) {
      return await fetchDbCart(userId);
    } else {
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("mriyafoods-cart:guest");
        return local ? JSON.parse(local) : [];
      }
      return [];
    }
  },
);

interface RootStateLike {
  user: {
    user: { id: string } | null;
  };
  cart: CartState;
}

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (product: Product, thunkAPI) => {
    const state = thunkAPI.getState() as RootStateLike;
    const userId = state.user.user?.id;
    const items = state.cart.items;
    const existing = items.find((item) => item.product.id === product.id);
    const newQuantity = existing ? existing.quantity + 1 : 1;

    if (userId) {
      await upsertDbCartItem(userId, product.id, newQuantity);
    }
    return product;
  },
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootStateLike;
    const userId = state.user.user?.id;

    if (userId) {
      await deleteDbCartItem(userId, productId);
    }
    return productId;
  },
);

export const updateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootStateLike;
    const userId = state.user.user?.id;

    if (userId) {
      await upsertDbCartItem(userId, productId, quantity);
    }
    return { productId, quantity };
  },
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootStateLike;
    const userId = state.user.user?.id;

    if (userId) {
      await clearDbCart(userId);
    }
    return [];
  },
);

export const mergeGuestCartThunk = createAsyncThunk(
  "cart/mergeGuestCart",
  async (userId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootStateLike;
    const guestItems = state.cart.items;

    // Fetch user's existing DB cart items
    const dbItems = await fetchDbCart(userId);

    // Merge logic
    const mergedMap = new Map<string, CartItem>();

    // Load db items
    dbItems.forEach((item) => {
      mergedMap.set(item.product.id, { ...item });
    });

    // Merge guest items on top
    guestItems.forEach((guestItem) => {
      const existing = mergedMap.get(guestItem.product.id);
      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        mergedMap.set(guestItem.product.id, { ...guestItem });
      }
    });

    const mergedItems = Array.from(mergedMap.values());

    // Update database for all merged items
    for (const item of mergedItems) {
      await upsertDbCartItem(userId, item.product.id, item.quantity);
    }

    // Clean up local guest cart storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("mriyafoods-cart:guest");
    }

    return mergedItems;
  },
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoaded = true;
        state.loading = false;
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      // Add To Cart
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const product = action.payload;
        const existing = state.items.find(
          (item) => item.product.id === product.id,
        );
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ product, quantity: 1 });
        }
      })
      // Remove From Cart
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );
      })
      // Update Quantity
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const existing = state.items.find(
          (item) => item.product.id === productId,
        );
        if (existing && quantity > 0) {
          existing.quantity = quantity;
        }
      })
      // Clear Cart
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
      })
      // Merge Guest Cart
      .addCase(mergeGuestCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeGuestCartThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoaded = true;
        state.loading = false;
      })
      .addCase(mergeGuestCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to merge cart";
      });
  },
});

export const cartReducer = cartSlice.reducer;
export default cartReducer;
