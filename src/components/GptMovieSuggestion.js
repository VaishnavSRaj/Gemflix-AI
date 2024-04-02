import React from "react";
import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";


const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovieSuggestions, tmdbResults } = gpt;
  if (!gptMovieSuggestions) return null;

  return (
    <div className="p-4 md:px-8 px-2 m-4 md:my-7 text-white">
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-30 rounded-lg">
        {gptMovieSuggestions.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={tmdbResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
