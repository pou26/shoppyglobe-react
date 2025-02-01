
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async fetch products from API
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
});

const productSlice = createSlice({
  name: "products",
  initialState: { 
    products: [],          // Stores all products from API
    filteredProducts: [],  // Stores filtered products
    category: "all",       // Default category
    loading: false, 
    error: null 
  },
  reducers: {
    // Set category filter and update the filtered products list
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
      if (action.payload === "all") {
        state.filteredProducts = state.products; // Show all products
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filtered products with all products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the action for category filtering
export const { setCategoryFilter } = productSlice.actions;
export const selectFilteredProducts = (state) => state.products.filteredProducts;

// Export the reducer to be used in store
export default productSlice.reducer;

