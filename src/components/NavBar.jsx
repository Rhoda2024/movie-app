import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';

const NavBar = () => {
  const [view, setView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [responses, setResponses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false); 

  const toggleView = () => {
    setView(!view);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${searchQuery}`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk',
          },
        }
      );

      setResponses(res.data.results);
      setShowResults(true); 

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false); 
    setResponses(null); 
    setSearchQuery('');
  };

  const navigate = useNavigate();
  
  const openDetails = (id) =>{
    navigate(`/details/${id}`);
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex items-center justify-center gap-[1.5rem] pt-[1rem] pb-[2rem] bg-black text-white">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="" className="hover:underline">Genre</Link>
        <Link to="" className="hover:underline">Country</Link>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Movies...."
            className="border-[2px] text-black py-[5px] px-[7rem] rounded-[15px] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            {isLoading ? 'Loading...' : <BiSearch/>}
          </button>
        </div>
        <Link to="/seeMoreNew" className="hover:underline">Movie</Link>
        <Link to="/MoreSeries" className="hover:underline">Series</Link>
        <Link to="" className="hover:underline">Animation</Link>
        <Link to="" className="hover:underline">Login/Signup</Link>
      </div>

      {/* Mobile View */}
        <div className='flex justify-between items-center px-6'>
       <Link to="/" className="hover:underline lg:hidden ">Home</Link>
      
      <div className="flex flex-col gap-[5px] py-[2rem] gm:gap-[10px] lg:hidden" onClick={toggleView}>
        <div className="border w-[2rem] h-[2px] border-white"></div>
        <div className="border w-[2rem] h-[2px] border-white"></div>
        <div className="border w-[2rem] h-[2px] border-white"></div>
      </div>
      </div>

      {view && (
        <div className="flex flex-col justify-center items-center gap-[2rem] pt-[1rem] pb-[2rem] bg-black text-white">
          <Link to="" className="hover:underline">Genre</Link>
          <Link to="" className="hover:underline">Country</Link>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Movies...."
              className="border-[2px] text-black py-[5px] px-[0rem] sm:px-[4rem] rounded-[15px] outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              {isLoading ? 'Loading...' : <BiSearch/>}
            </button>
          </div>
          <Link to="/seeMoreNew" className="hover:underline">Movie</Link>
          <Link to="/MoreSeries" className="hover:underline">Series</Link>
          <Link to="" className="hover:underline">Animation</Link>
          <Link to="" className="hover:underline">Login/Signup</Link>
        </div>
      )}

      {/* Display Search Results */}
      {showResults && (
        <div className="bg-gray-800 text-white p-4 max-w-[70%] m-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Search Results:</h2>
            <button
              onClick={handleCloseResults}
              className="text-red-600 hover:underline"
            >
              <CgClose size={30}/>
            </button>
          </div>
          <div className="mt-4 max-h-96  overflow-y-auto">
            <ul className="space-y-4">
              {responses.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-2 bg-black rounded hover:bg-gray-700 cursor-pointer"
                  onClick={()=>{
                    openDetails(item.id)
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.title || item.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.overview
                        ? `${item.overview.substring(0, 100)}...`
                        : 'No description available'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
