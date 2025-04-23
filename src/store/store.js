import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import shopReducer from "./slices/shopSlice";
import orderReducer from "./slices/orderSlice";
import ownerReducer from "./slices/ownerSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
    shop: shopReducer,
    order: orderReducer,
    owner: ownerReducer,
  },
});
