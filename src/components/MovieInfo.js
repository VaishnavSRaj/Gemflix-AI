import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import useMovieInfo from "../hooks/useMovieInfo";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { BANNER_IMG_CDN_URL } from "../utils/constants";
import MovieInfoContainer from "./MovieInfoContainer";
import MovieCastInfo from "./MovieCastInfo";
import MovieVideos from "./MovieVideos";

const MovieInfo = () => {
  const { id } = useParams();

  useMovieInfo(id);
  const movie = useSelector((store) => store.movies?.movieInfo);
  if (!movie) return <Loader />;

  return (
    <div>
      <div className="w-full min-h-[110vh] md:min-h-screen top-0 absolute -z-10 overflow-hidden bg-black">
        <img
          className="h-[110vh] md:h-auto object-cover mx-auto brightness-[.3]"
          src={BANNER_IMG_CDN_URL + movie.backdrop_path}
          alt="moviebg"
        />
      </div>
      <MovieInfoContainer info={movie} />
      <MovieCastInfo id={movie.id} />
      <MovieVideos id={movie.id} />
    </div>
  );
};

export default MovieInfo;
