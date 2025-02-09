import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/cart/add`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "user/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Ошибка получения корзины:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserData, clearCart } = userSlice.actions;
export default userSlice.reducer;
