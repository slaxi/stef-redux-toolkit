import { configureStore } from "@reduxjs/toolkit";
import reducer from "./imagesList";
import { api } from "./middleware/api";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});
