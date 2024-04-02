import { Link } from "react-router-dom";


const VideoTitle = ({ title, overview , movieId}) => {
  return (
    <div className=" w-screen aspect-video pt-[15%]  px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="">
        <Link to={'/movieinfo/'+movieId}>
      <button className="bg-white text-black md:px-4 px-2 py-1 md:py-1.5 text-lg rounded-md hover:bg-opacity-80 font-semibold">
        <i className="fa-solid fa-circle-info text-lg pr-1 text-black"></i>
        More Info
        </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;
