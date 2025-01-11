import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeeMoreSeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNewSeries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9. eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );
      setSeries(res.data.results);
    } catch (err) {
      setError("Failed to fetch series. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewSeries();
  }, []);

  const navigate = useNavigate();

  const openDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="pt-[5rem] max-w-[1500px] m-auto px-[2rem]">
      <p className="font-bold text-[24px] pb-[1rem]">New Release - Series</p>

      {isLoading ? (
        <div className="flex  h-[300px]">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="cursor-pointer"
              onClick={() => openDetails(serie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                alt={serie.title || serie.original_name || "Series poster"}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <p className="mt-2 font-medium">
                {serie.title || serie.original_name}
              </p>
              <div className="flex items-center gap-[6rem]">
                <p className="text-white">
                  {`Release Date: ${serie.release_date || serie.first_air_date}`}
                </p>
                <p className="border border-none py-1 w-[35px] text-center bg-red-700 text-white">
                  {serie.original_language}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeMoreSeriesPage;
