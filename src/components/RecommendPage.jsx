import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const RecommendPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [popular, setPopulars] = useState([]);
  const [activeTab, setActiveTab] = useState("Movies");

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        {
           headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );
      setMovies(res.data.results.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSeries = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
           headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );
      setSeries(res.data.results.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopular = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        {
           headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );
      setPopulars(res.data.results.slice(0, 8));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchSeries();
    fetchPopular();
  }, []);

  const navigate = useNavigate();

  const openDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const renderContent = () => {
    const content =
      activeTab === "Movies"
        ? movies
        : activeTab === "Series"
        ? series
        : popular;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]'>
              {content.map((item,index)=>(
                <ul key={index}>
                  <li className='cursor-pointer list-none' onClick={()=>(
                    openDetails(item.id)
                  )}>
      
                     <div className='max-w-[325px] h-[400px] rounded-[1rem]'
                      style={{
                        backgroundImage:`url(https://image.tmdb.org/t/p/original${item.poster_path})`,
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                    }}>
                    </div>
      
                     <div className='flex items-center justify-between pt-4'>
                     <p className='text-white font-medium text-[18px]'>{item.title}{item.original_name}</p>
      
                     <div className='flex items-center gap-2'>
                      <p className='bg-red-700 w-fit px-2 py-1 font-medium text-[16px] rounded-md '>{item.original_language}</p>
      
                     <p className='border-[2px] py-1 px-2 rounded-lg border-red-700 flex items-center gap-2'><MdOutlineWatchLater size={25}/>3:12:00</p>
                     </div>
                   </div>
      
                  </li>
                </ul>
              ))}
            </div>
    );
  };

  return (
    <div className="max-w-[1500px] m-auto px-[2rem] pt-[2rem]">
      <div className="flex flex-col le:flex-row le:items-center justify-between pb-6">

      {/* Header */}
      <div className=" flex flex-col le:flex-row gap-8">
        <p className="font-bold text-[24px] text-white">Recommended</p>
        <div className="flex flex-col le:flex-row gap-4">
          <button
            onClick={() => setActiveTab("Movies")}
            className={`py-2 px-6 rounded-full text-sm font-semibold ${
              activeTab === "Movies"
                ? "bg-red-700 text-white"
                : "border border-red-700 text-gray-400"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab("Series")}
            className={`py-2 px-6 rounded-full text-sm font-semibold ${
              activeTab === "Series"
                ? "bg-red-700 text-white"
                : "border border-red-700 text-gray-400"
            }`}
          >
            Series
          </button>
          <button
            onClick={() => setActiveTab("Popular")}
            className={`py-2 px-6 rounded-full text-sm font-semibold ${
              activeTab === "Popular"
                ? "bg-red-700 text-white"
                : "border border-red-700 text-gray-400"
            }`}
          >
           Popular
          </button>
        </div>
      </div>

      
      {/* View All Button */}
      <div className="flex items-center justify-center pt-4">
        {activeTab === "Movies" && (
          <Link to="seeMoreNew" >
            <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p>
          </Link>
        )}
        {activeTab === "Series" && (
          <Link to="/MoreSeries">
            <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p>
          </Link>
        )}
        {activeTab === "Popular" && (
          <Link
            to="/MoreRecommend"
          >
           <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p>
          </Link>
        )}
      </div>

      </div>

      {/* Content Grid */}
      <div className="pt-1">
        {isLoading ? <p>Loading...</p> : renderContent()}
      </div>
    </div>
  );
};

export default RecommendPage;
