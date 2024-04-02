import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieSuggestions: null,
    tmdbResults: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptmovies: (state, action) => {
      const { movieNames, tmdbMovies } = action.payload;
      state.gptMovieSuggestions = movieNames;
      state.tmdbResults = tmdbMovies;
    },
  },
});

export const { toggleGptSearchView, addGptmovies } = gptSlice.actions;
export default gptSlice.reducer;
