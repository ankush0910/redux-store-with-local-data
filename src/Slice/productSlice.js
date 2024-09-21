// features/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], 
    addedProducts: [], 
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.addedProducts.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;

export const selectProducts = (state) => [...state.products.items, ...state.products.addedProducts];

export default productSlice.reducer;
