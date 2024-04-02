import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { Header } from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import NoMovies from "./NoMovies";
import { useDispatch } from "react-redux";
import { clearMovieInfo } from "../utils/movieSlice";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movies = useSelector((store) => store.movies.nowPlayingMovie);
  const dispatch = useDispatch()
  dispatch(clearMovieInfo())
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {movies ? (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          ) : (
            <NoMovies />
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
