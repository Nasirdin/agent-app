import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../../helpers";

export const fetchShops = createAsyncThunk(
  "shop/fetchShop",
  async (_, { rejectWithValue }) => {
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

      const response = await axiosInstance.get(`/shops`);

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
export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shops: [],
    activeShop: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = shopSlice.actions;

export default shopSlice.reducer;
