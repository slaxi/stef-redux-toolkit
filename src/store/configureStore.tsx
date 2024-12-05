import { configureStore } from "@reduxjs/toolkit";
import reducer from "./imagesList";
import { api } from "./middleware/api";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;