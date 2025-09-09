import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";

type ProductsState = {
  products: Array<Product>;
};

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
  },
});

export const { updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
