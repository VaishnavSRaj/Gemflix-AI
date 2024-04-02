import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieInfo } from "../utils/movieSlice";

const useMovieInfo = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMovieInfo();
  }, []);

  const fetchMovieInfo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id,
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addMovieInfo(json));
  };
};

export default useMovieInfo;
