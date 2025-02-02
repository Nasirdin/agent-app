import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
  },
});
