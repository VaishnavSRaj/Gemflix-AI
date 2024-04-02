import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { movieTrailerVideo } from "../utils/movieSlice";

const useGetTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieTrailer=useSelector(store=>store.movies.movieTrailer)

  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );

    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(movieTrailerVideo(trailer));
  };
  useEffect(() => {
    !movieTrailer && getMovieVideo();
  }, []);
};

export default useGetTrailer;
