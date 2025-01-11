import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SeeMoreRecommendPage=()=> {
    const [recommends, setRecommends]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    
    const getRecommendMovies = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(
                "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
                {
                   headers: {
                   accept: 'application/json',
                   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9. eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
                   }, 
                }
            );
          setRecommends(res.data.results);
            
        } catch (error) {
            console.log(error)
            
        }
    };

    console.log(recommends)


    

    useEffect(()=>{
        getRecommendMovies();
    }, []);

    const navigate = useNavigate();

    const openDetails = (id) => {
        navigate(`/details/${id}`);
    };

  return (
     <div className="bg-black text-white py-[3rem]">
      <div className="max-w-[1500px] m-auto px-[2rem]">
        <p className="font-bold text-[24px] pb-[1rem]">Recommended</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommends.map((recommend, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => openDetails(recommend.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${recommend.poster_path}`}
                  alt={recommend.title || recommend.original_name}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <p className="mt-2 font-medium">
                  {recommend.title || recommend.original_name}
                </p>
                
                 <div className='flex items-center gap-[6rem]'>
                  <p className='text-white'>{`Release Date: ${recommend.release_date || recommend.first_air_date}`}</p>
                  <p className='border border-none py-1 w-[35px] text-center bg-red-700 text-white'>{recommend.original_language}</p>
                </div>

              </div>
            ))}
          </div>

      </div>
    </div>
  )
}

export default SeeMoreRecommendPage