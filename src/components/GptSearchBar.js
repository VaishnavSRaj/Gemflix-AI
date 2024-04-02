import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, GEMINI_API_KEY } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptmovies } from "../utils/gptSlice";
import { gptQuery } from "../utils/helper";

const GptSearchBar = () => {

  
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const gptSuggestedMovies = useSelector(
    (store) => store.gpt.gptMovieSuggestions
  );

  const searchMovieTMBD = async (movie) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await res.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    
    const Query = gptQuery(searchText.current.value);
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = Query;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();
    

    if (data == null) return;
    const gptMovies = data.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMBD(movie));
    const tmdbResult = await Promise.all(promiseArray);
    dispatch(addGptmovies({movieNames : gptMovies , tmdbMovies: tmdbResult}));
    
  };

  return (

    <div className="md:pt-[12%] pt-[40%]  flex justify-center">
          <form
            className="w-full px-5 md:w-1/2 grid grid-cols-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchText}
              type="text"
              className="p-3 col-span-9 rounded-l-full outline-none text-center text-sm sm:text-base"
              placeholder={lang[langKey].placeholder}
            />
            <button
              className="col-span-3 py-2 px-4 bg-red-700 hover:bg-red-800 text-white rounded-r-full"
              onClick={handleGPTSearchClick}
            >
            {lang[langKey].search}
            </button>
          </form>
        </div>


    
    // <div className=" flex justify-center  items-center h-screen  ">
    //   <div className="w-1/2">
    //     <form
    //       className="bg-black rounded-lg p-6 grid grid-cols-12 gap-4"
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //       }}
    //     >
    //       <input
    //         type="text"
    //         ref={searchText}
    //         className="col-span-8 p-4 rounded-lg bg-gray-800 text-white focus:outline-none"
    //         placeholder={lang[langKey].placeholder}
    //       />
    //       <button
    //         onClick={handleGPTSearchClick}
    //         className="col-span-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
    //       >
    //         {lang[langKey].search}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default GptSearchBar;
