import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";

export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
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
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
