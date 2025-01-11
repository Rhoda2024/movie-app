import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeeMoreNewRelase = () => {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNewRelease = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk",
          },
        }
      );
      setReleases(res.data.results);
    } catch (error) {
      console.error("Error fetching releases:", error);
    } finally {
      setIsLoading(false);
    }
  };
console.log(releases)

  useEffect(() => {
    getNewRelease();
  }, []);

  const navigate = useNavigate();

  const openDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="bg-black text-white py-[3rem]">
      <div className="max-w-[1500px] m-auto px-[2rem]">
        <p className="font-bold text-[24px] pb-[1rem]">New Release - Movies</p>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {releases.map((release, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => openDetails(release.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${release.poster_path}`}
                  alt={release.title || release.original_name}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <p className="mt-2 font-medium">
                  {release.title || release.original_name}
                </p>
                
                 <div className='flex items-center gap-[6rem]'>
                  <p className='text-white'>{`Release Date: ${release.release_date || release.first_air_date}`}</p>
                  <p className='border border-none py-1 w-[35px] text-center bg-red-700 text-white'>{release.original_language}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMoreNewRelase;