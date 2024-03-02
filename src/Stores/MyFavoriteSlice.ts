import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyFavoriteSlice {
  favorites: number[];
}

const initialState: MyFavoriteSlice = { favorites: [3, 2] };

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      const addElemenIndex = state.favorites.findIndex(
        (item) => item == action.payload
      );
      if (addElemenIndex < 0) {
        const assembledItem = action.payload;
        state.favorites.push(assembledItem);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      const updateFavorite = state.favorites?.filter(
        (item) => item !== action.payload
      );
      state.favorites = updateFavorite;
    },

    clearFavorite: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
