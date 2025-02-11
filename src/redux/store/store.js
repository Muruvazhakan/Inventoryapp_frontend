import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import stockSlice from "../productSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    stock: stockSlice,
  },
});
