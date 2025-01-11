import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SeeMore = () => {
  const [pictures, setPictures] = useState([]);
  const [isloading, setIsloading] = useState(false)



  const getMovie = async () => {
    try {
      setIsloading(true);

      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );

      setPictures(res.data.results);

    } catch (error) {
      setIsloading(false);
      console.log(error)
    } finally {
      setIsloading(false)
    }
  };

  console.log(pictures)


  useEffect(() => {
    getMovie();
  }, []);

  const navigate = useNavigate();

  const openDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className='bg-black text-white'>
      <div className=' pt-[3rem] max-w-[1500px] m-auto px-[2rem]'>
        <p className='font-medium text-[40px]'>Trending</p>

      {isloading ? (
        <p>Loading...</p>
      ):(
         <div className='grid grid-cols-4 gap-4 pt-[1rem] '>
          {pictures.map((picture, index) => (
            <ul key={index}>
              <li className='cursor-pointer list-none'
                onClick={() => {
                  openDetails(picture.id)
                }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${picture.poster_path}`}
                  alt={picture.title}
                  className='w-[300px] h-[350px] object-cover rounded-[10px]'
                />
                <p className='text-white'>{picture.title}</p>
                <div className='flex items-center gap-[6rem]'>
                  <p className='text-white'>{`Release Date: ${picture.release_date}`}</p>
                  <p className='border border-none py-1 w-[35px] text-center bg-red-700 text-white'>{picture.original_language}</p>
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}  
      
      </div>
    </div>
  );
};

export default SeeMore