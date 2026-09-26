import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>,
    ) => {
      const { index, quantity } = action.payload;

      if (quantity <= 0) {
        state.items.splice(index, 1);
        return;
      }

      const item = state.items[index];

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
