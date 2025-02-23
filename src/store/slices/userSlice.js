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
    const response = await axiosInstance.post(`/cart/add`, {
      userId,
      productId,
      quantity,
    });
    if (!response.data) {
      console.error("Ошибка добавления в корзину:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
    return response.data;
  }
);

export const fetchCart = createAsyncThunk(
  "user/fetchCart",
  async (userId, { rejectWithValue }) => {
    const response = await axiosInstance.get(`/cart/${userId}`);
    if (!response.data) {
      console.error("Ошибка получения корзины:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "user/fetchOrders",
  async (userId, { rejectWithValue }) => {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    if (!response.data) {
      console.error("Ошибка при получении заказов:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
    return response.data;
  }
);

export const fetchFinishedOrders = createAsyncThunk(
  "user/fetchFinishedOrders",
  async (userId, { rejectWithValue }) => {
    const response = await axiosInstance.get(`/orders/finish/user/${userId}`);
    if (!response.data) {
      console.error("Ошибка при получении заказов:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: [],
    orders: [],
    selectedOrder: null,
    finishOrders: [],
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
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
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
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFinishedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinishedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.finishOrders = action.payload;
      })
      .addCase(fetchFinishedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserData, clearCart, selectOrder } = userSlice.actions;
export default userSlice.reducer;
