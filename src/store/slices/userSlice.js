import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "@env";
import { getToken } from "../../helpers";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getAuthHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("Token not found");
  return { Authorization: `Bearer ${token}` };
};

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axiosInstance.post(
        `/cart`,
        { productId, quantity },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "user/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axiosInstance.get(`/cart`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const fetchFinishedOrders = createAsyncThunk(
  "user/fetchFinishedOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axiosInstance.get(
        `/orders/finish/user/${userId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching finished orders:", error);
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

export const removeProductInCart = createAsyncThunk(
  "user/removeProductInCart",
  async (productId, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axiosInstance.delete(`/cart`, {
        headers,
        data: { productId },
      });
      return response.data;
    } catch (error) {
      console.error("Error remove product:", error);
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: [],
    orders: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [...state.cart, action.payload];
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

export const { setUserData, clearCart } = userSlice.actions;
export default userSlice.reducer;
