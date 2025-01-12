import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCirclePlay, FaStar } from 'react-icons/fa6';
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoTimerOutline } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [pictures,setPictures]=useState([]);
  const[isloading, setIsloading] =useState(false);
  const [genres, setGenres] = useState([]);
  const [releases,SetReleases]=useState([]);
  const [series, setSeries]=useState([]);


const getMovie =async () =>{
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

    console.log("res",res.data);
    setPictures(res.data.results.slice(0, 3));

  } catch (error) {
    setIsloading(false);
    console.log(error)
  }finally{
    setIsloading(false)
  }
};
console.log(pictures)

const fetchGenres = async ()=>{
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",

        {
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
      );

      setGenres(res.data.genres);
      
    } catch (error) {
      console.log(error)
    }
  }

  const getGenreName = (id) => {
  const genre = genres.find((genre) => genre.id === id);
  return genre ? genre.name : null;
};


const getNewRelease = async()=>{
  try {
    setIsloading(true);

    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
       {
          headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
        }
    );
    console.log("res",res.data);
    SetReleases(res.data.results.slice(5, 9));
    
  } catch (error) {
    console.log(error)
    
  }
};
console.log(releases)

const getSeries = async()=>{
  try {
    setIsloading(true);
    
    const res =await axios.get(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      {
         headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
      }

    );
    console.log ("res",res.data);
    setSeries(res.data.results.slice(0,4))

  } catch (error) {
    setIsloading(false)
    console.log(error) 
  };
};
console.log(series)



useEffect(()=>{
  getMovie();
  fetchGenres();
  getNewRelease();
  getSeries();
},[]);

const navigate = useNavigate();

const openDetails = (id) =>{
  navigate(`/details/${id}`);
};


  return (
  <div className='bg-black text-white py-[5rem]'>

    {/* Recently Updated */}
     <div className='pt-[5rem] max-w-[1500px] m-auto px-[2rem]'>

      <div className='flex justify-between items-center pb-4'>
        <p className='font-bold text-[24px] pb-[1rem]'>Recently Updated</p>
         
      </div>

      {isloading ? (
        <p>Loading...</p>
      ):(
       <div className='flex items-center justify-between '>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px]'>
        {series.map((serie,index)=>(
          <ul key={index}>
            <li className='cursor-pointer list-none' onClick={()=>{
              openDetails(serie.id) 
              }}>

              <div className='flex gap-[20px] items-center'>
                
              <div className='w-[100px] h-[110px] rounded-[5px]'
                style={{
                  backgroundImage:`url(https://image.tmdb.org/t/p/original${serie.poster_path})`,
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center",
                  backgroundSize:"cover",
              }}>
                
              </div>
       
             <div>
              <p className='text-white font-medium text-[18px]'>{serie.title}{serie.original_name}</p>
              <p>{serie.first_air_date}</p>
              </div>


              </div>
              </li>
          </ul>
        ))}
         
      </div>

      <Link to="/MoreSeries"> <p className='flex items-center gap-1 text-[18px] hover:text-neutral-700 cursor-pointer'><IoIosArrowRoundForward size={30}  className='bg-[#D9D9D9] w-[4rem] h-[4rem] rounded-full text-black  hover:bg-neutral-500 ' /></p></Link>
       </div>
      
      )}

    </div>
    {/* end of Recently Updated */}
      

      {/* Trending movies  */}
    <div className=' pt-[3rem] max-w-[1500px] m-auto px-[2rem]'>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-[24px]'>Trending</p>
       <Link to="/SeeMore"> <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p></Link>
      </div>
       

       {isloading ? (
        <p>Loading...</p>
       ):(
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 pt-[1rem] '>
        {pictures.map((picture, index) => (
          <li className='cursor-pointer list-none' key={index} onClick={()=>{
            openDetails(picture.id)
          }}>
          <div 
          className='max-w-[450px] h-[400px] rounded-[1rem]'
          style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/original${picture.backdrop_path})`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
          }}
          >
            <div className='flex justify-between items-center py-4 px-4'>
              <p className='flex items-center gap-2'><IoTimerOutline/> 3:12:00</p>
              <p className='flex items-center gap-2'> <FaStar/> {picture.vote_average.toFixed(1)}</p>
            </div>

            <div className='flex justify-center items-center w-full pt-[4rem] h-[50%]'>
              <p><FaCirclePlay size={50} /></p>
            </div>

          </div>

            <div className='flex items-center justify-between'>
              <p className='text-white font-medium text-[18px]'>{picture.title}</p>
           
            <div className="text-white text-lg my-2">
                {picture.genre_ids &&
                  picture.genre_ids.slice(0,2).map((genreId) => (
                    <span key={genreId} className="mr-2 py-1 px-2 bg-red-700 text-white rounded-[20px]">
                      {getGenreName(genreId)}
                    </span>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </div>

       )}
      
    </div>
    {/* end  Trending movies  */}



    {/* New Release movies */}
    <div className='pt-[5rem] max-w-[1500px] m-auto px-[2rem]'>

      <div className=' le:flex justify-between items-center pb-[1rem]'>
        <p className='font-bold text-[24px] '>New Release - Movies</p>
          <Link to="/SeeMoreNew"> <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p></Link>
      </div>

      {isloading ? (
        <p>Loading...</p>
      ):(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]'>
        {releases.map((release,index)=>(
          <ul key={index}>
            <li className='cursor-pointer list-none' onClick={()=>{
              openDetails(release.id)
            }}>

              <div className='max-w-[325px] h-[400px] rounded-[1rem]'
              style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/original${release.poster_path})`,
                backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
              }}>
              </div>

             <div className='flex items-center justify-between pt-4'>
               <p className='text-white font-medium text-[18px]'>{release.title}{release.original_name}</p>

               <div className='flex items-center gap-2'>
                <p className='bg-red-700 w-fit px-2 py-1 font-medium text-[16px] rounded-md '>{release.original_language}</p>

               <p className='border-[2px] py-1 px-2 rounded-lg border-red-700 flex items-center gap-2'><MdOutlineWatchLater size={25}/>3:12:00</p>
               </div>
             </div>

            </li>
          </ul>
        ))}
      </div>
      )}
    </div>
    {/* end of New Release movies */}



    {/* New Release Series */}
    <div className='pt-[5rem] max-w-[1500px] m-auto px-[2rem]'>

      <div className='le:flex justify-between items-center pb-[1rem]'>
        <p className='font-bold text-[24px] '>New Release - Series</p>
          <Link to="/MoreSeries"> <p className='flex items-center gap-1 text-[18px] hover:text-neutral-500 cursor-pointer'>View all <IoIosArrowRoundForward size={30} /></p></Link>
      </div>

      {isloading ? (
        <p>Loading...</p>
      ):(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]'>
        {series.map((serie,index)=>(
          <ul key={index}>
            <li className='cursor-pointer list-none' onClick={()=>{
              openDetails(serie.id) 
              }}>

             <div className='max-w-[325px] h-[400px] rounded-[1rem]'
                style={{
                  backgroundImage:`url(https://image.tmdb.org/t/p/original${serie.poster_path})`,
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center",
                  backgroundSize:"cover",
              }}>
              </div>

              
             <div className='flex items-center justify-between pt-4'>
               <p className='text-white font-medium text-[18px]'>{serie.title}{serie.original_name}</p>

               <div className='flex items-center gap-2'>
                <p className='bg-red-700 w-fit px-2 py-1 font-medium text-[16px] rounded-md '>{serie.original_language}</p>

               <p className='border-[2px] py-1 px-2 rounded-lg border-red-700 flex items-center gap-2'><MdOutlineWatchLater size={25}/>3:12:00</p>
               </div>
             </div>
               

              </li>
          </ul>
        ))}
      </div>

      )}

    </div>
    {/* end of new realese series */}



</div>
  )
}

export default Home