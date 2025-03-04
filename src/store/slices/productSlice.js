import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (categoryId, { rejectWithValue }) => {
    const response = await axiosInstance.get(`/products`, {
      params: { category: categoryId },
    });
    if (!response.data) {
      console.log("fetchProducts data is not found!");
      retrun;
    }
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    activeProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveProduct } = productSlice.actions;

export default productSlice.reducer;
