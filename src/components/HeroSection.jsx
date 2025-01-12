import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegCalendarDays } from 'react-icons/fa6';

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImages = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk',
          },
        }
      );

      const movies = response.data.results.slice(0, 4); 
      setMovies(movies);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk',
          },
        }
      );

      setGenres(res.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenreName = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : null;
  };

  useEffect(() => {
    getImages();
    fetchGenres();
  }, []);

  // Automatic slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); 
  }, [movies]);

  return (
    <div>
      <div className="hero relative">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="w-20 h-20 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div
            className="relative"
            style={{
              backgroundImage: movies[currentIndex]?.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path})`
                : 'none',
              height: '90vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute w-full h-[100vh] bg-[rgba(0,0,0,0.4)]">
              {/* Buttons at the center of the image */}
              <div className="absolute pt-[5rem] sm:inset-0 flex flex-wrap items-center justify-center gap-4 z-10">
                <button className="bg-red-800 text-white le:text-[24px] font-bold w-fit sm:px-[1rem] sm:py-[1rem] flex items-center gap-2">
                  Watch Now <IoIosPlayCircle size={40} />
                </button>
                <button className="text-white le:text-[24px] font-bold w-fit sm:py-[0.5rem] sm:px-[0.5rem] border-[3px] border-red-800 flex items-center gap-2">
                  Watch Later <MdOutlineWatchLater size={40} />
                </button>
              </div>

              <div className=" max-w-[1400px] flex flex-col gap-4 justify-end m-auto h-full pb-[11rem] px-[2rem]">
                <h1 className=" text-[2rem] le:text-4xl font-bold text-white">
                  {movies[currentIndex]?.title || 'No Title Available'}
                </h1>

                <div className="flex flex-wrap items-center gap-[1rem]">
                  <div className="text-white text-lg my-2">
                    {movies[currentIndex]?.genre_ids &&
                      movies[currentIndex]?.genre_ids.map((genreId) => (
                        <span
                          key={genreId}
                          className="mr-2 py-2 px-8 bg-white text-black rounded-[20px]"
                        >
                          {getGenreName(genreId)}
                        </span>
                      ))}
                  </div>

                  <p className="flex items-center gap-2">
                    <FaRegCalendarDays />
                    {movies[currentIndex]?.release_date}
                  </p>

                  <p className="text-white font-normal text-[1rem] flex gap-2 items-center">
                    <MdOutlineStarPurple500 />
                    {movies[currentIndex]?.vote_average}
                  </p>
                </div>

                <p className="text-white font-normal text-[1rem] max-w-[700px]">
                  {movies[currentIndex]?.overview || 'No Description Available'}
                </p>
              </div>

              {/* Dots */}
              <div className="absolute bottom-[8rem] left-[50%] translate-x-[-50%] flex gap-2">
                {movies.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-5 h-5 rounded-full ${
                      currentIndex === index
                        ? 'bg-white'
                        : 'bg-gray-400'
                    } cursor-pointer`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
