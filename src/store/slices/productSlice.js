import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../../helpers";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      searchText = "",
      limit = 25,
      offset = 0,
      random = false,
      sortBy = "createdAt",
      order = "DESC",
    },
    { rejectWithValue }
  ) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue("Токен не найден");

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(`/products`, {
        params: {
          search: searchText,
          limit,
          offset,
          random,
          sortBy,
          order,
        },
      });

      return response.data || { products: [], total: 0 };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      if (!categoryId) return rejectWithValue("ID категории не указан");

      const token = await getToken();
      if (!token) return rejectWithValue("Токен не найден");

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(
        `/products/category/` + categoryId
      );

      return response.data || { products: [], total: 0 };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const toggleFavoriteProducts = createAsyncThunk(
  "product/addToggleFavoriteProducts",
  async ({ productId }, { rejectWithValue }) => {
    try {
      if (!productId) return rejectWithValue("ID продукта не указан");
      const token = await getToken();
      if (!token) return rejectWithValue("Токен не найден");
      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axiosInstance.post("/products/favorite", {
        productId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const fetchFavoriteProducts = createAsyncThunk(
  "product/fetchFavoriteProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue("Токен не найден");

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(`/products/favorite`)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categoryProducts: [],
    favoriteProducts: [],
    total: 0,
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

        if (action.meta.arg.offset === 0) {
          state.products = action.payload.products;
        } else {
          state.products = [...state.products, ...action.payload.products];
        }

        state.total = action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavoriteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteProducts = action.payload;
      })
      .addCase(fetchFavoriteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export const { setActiveProduct } = productSlice.actions;
export default productSlice.reducer;
