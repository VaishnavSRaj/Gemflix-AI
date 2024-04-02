import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: null,
    movieTrailer: null,
    popularMovie: null,
    topRatedMovie: null,
    upComingMovies: null,
    movieInfo: null,
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    movieTrailerVideo: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovie = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovie = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addMovieInfo: (state, action) => {
      state.movieInfo = action.payload;
    },
    clearMovieInfo: (state, action) => {
      state.movieInfo = null;
    },
  },
});

export const {
  addNowPlayingMovie,
  movieTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovieInfo,
  clearMovieInfo,
} = movieSlice.actions;
export default movieSlice.reducer;
