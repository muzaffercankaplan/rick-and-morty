import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./MyFavoriteSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
