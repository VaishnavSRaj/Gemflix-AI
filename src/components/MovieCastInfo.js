import { useEffect , useState} from "react";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";

const Moviecast = ({ id }) => {
  const [cast , setCast ] = useState([])
  const fetchCast = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/credits",
      API_OPTIONS
    );
    const json = await data.json();
    setCast(json.cast)
    
  };
 

  useEffect(() => {
    fetchCast();
  }, []);

  return(
    <div className="bg-black py-4 px-8">
    <div className="md:mb-5 mb-2">
      <span className="text-white font-bold md:text-3xl text-xl">Cast</span>
    </div>
    <div className="">
      <div className="w-12/12 py-2">
        <div className="flex flex-row overflow-x-scroll gap-5">
          {cast.map((cast) =>
            cast?.profile_path ? (
             <div
                key={cast.id}
                className="flex justify-between items-center rounded-lg  flex-col bg-zinc-700 max-h-44 md:max-h-64"
              >
                <div className=" rounded-t-lg overflow-hidden h-[150px] md:h-auto xl:w-[170px] md:w-[150px] sm:w-[130px] w-[90px] lg:w-[160px]">
                  <img
                    className="w-full"
                    src={IMG_CDN + cast?.profile_path}
                    alt="actor"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center items-center px-2 py-1">
                  <span className="text-white font-semibold xl:text-base lg:text-base md:text-sm sm:text-sm text-xs text-center">
                    {cast?.name}
                  </span>
                  <span className="text-gray-300 font-light xl:text-sm md:text-xs sm:text-xs text-[10px] lg:text-sm text-center">{cast?.character}</span>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  </div>
  )
};

export default Moviecast;
