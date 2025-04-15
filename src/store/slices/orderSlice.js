import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../../helpers";

export const addOrderFunc = createAsyncThunk(
  "order/addOrder",
  async ({products, shopId}, { rejectWithValue }) => {
    try {
      const token = await getToken();

      if (!token) {
        console.error("Токен не найден");
        return rejectWithValue("Токен не найден");
      }

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.post(`/orders`, {
        products,
        shopId,
      });

      if (!response.data) {
        return rejectWithValue("Ошибка добавления в корзину");
      }

      const productIds = products.map((product) => product.productId);

      await axiosInstance.delete("/cart/del", {
        data: { productIds },
      });

      return response.data;
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (status, { rejectWithValue }) => {
    try {
      const token = await getToken();

      if (!token) {
        console.error("Токен не найден");
        return rejectWithValue("Токен не найден");
      }

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axiosInstance.get(`/orders/user`, {
        params: status ? { status } : {},
      });

      if (!response.data) {
        console.error("Нет данных в ответе");
        return rejectWithValue("Нет данных");
      }

      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    activeOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { setActiveOrder } = orderSlice.actions;

export default orderSlice.reducer;
