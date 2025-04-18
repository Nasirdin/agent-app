import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../../helpers";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
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

      const response = await axiosInstance.get(`/categories`);

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

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
