import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../../helpers";

export const getOwner = createAsyncThunk(
  "owner/getOwner",
  async (ownerId, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) return rejectWithValue("Токен не найден");

      const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get(`/owners/owner`, {
        params: {
          ownerId,
        },
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка сервера");
    }
  }
);

export const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ownerSlice.reducer;
