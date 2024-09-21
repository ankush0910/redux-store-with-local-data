
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
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
    
      const index = state.items.findIndex(product => product.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedProduct };
      }
      
      const addedIndex = state.addedProducts.findIndex(product => product.id === id);
      if (addedIndex !== -1) {
        state.addedProducts[addedIndex] = { ...state.addedProducts[addedIndex], ...updatedProduct };
      }
    },
  },
});

export const { setProducts, addProduct, updateProduct } = productSlice.actions;

export const selectProducts = (state) => [...state.products.items, ...state.products.addedProducts];

export default productSlice.reducer;
