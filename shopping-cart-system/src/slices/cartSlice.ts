import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

type CartState = {
  addedItems: Array<{
    product: Product;
    quantity: number;
  }>;
};

const initialState: CartState = {
  addedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const itemExisted = state.addedItems.find(
        (item) => item.product.id === action.payload.id
      );
      if (!!itemExisted) {
        itemExisted.quantity += 1;
      } else {
        state.addedItems.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<Product>) {
      const item = state.addedItems.find(
        (item) => item.product.id === action.payload.id
      );
      const itemQuantity = item?.quantity ?? 0;
      if (itemQuantity > 1) {
        item!.quantity -= 1;
      } else {
        state.addedItems = state.addedItems.filter(
          (item) => item.product.id !== action.payload.id
        );
      }
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
