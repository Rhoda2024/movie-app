import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineStarPurple500, MdOutlineWatchLater } from "react-icons/md";
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegCalendarDays } from 'react-icons/fa6';
import { IoTimerOutline } from 'react-icons/io5';
import { BiDislike, BiLike } from 'react-icons/bi';
import img1 from '../assets/first.png'
import img2 from '../assets/second.png'
import img3 from '../assets/third.png'
import img4 from '../assets/fourth.png'
import ReactPlayer from 'react-player';



const Details=()=> {
  const [responses,setResponses] = useState({})
  const [isloading, setIsloading] = useState(false);
  const [cast,setCast] = useState([])
  const[similars,setSmilars]=useState([])
  const[trailerKey, setTrailerKey] = useState("");
  const {id} = useParams();

  console.log(id)

  const formatRuntime = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes * 60) % 60); // This converts minutes to total seconds and gets the remainder after dividing by 60.

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


const getMovieTrailer = async ()=>{
  try {
    setIsloading(true)
    
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en=US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
      }
    )

    const trailer = res.data.results.find(
      (video)=> video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailerKey(trailer ? trailer.key : "");

  } catch (error) {
    setIsloading(false)
  }finally{
    setIsloading(false)
  }
}


const getTvTrailer = async ()=>{
  try {
    setIsloading(true)
    
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en=US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
      }
    )

    const trailer = res.data.results.find(
      (video)=> video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailerKey(trailer ? trailer.key : "");

  } catch (error) {
    setIsloading(false)
  }finally{
    setIsloading(false)
  }
}


 const getMovieDetails = async ()=>{
  try {
    setIsloading(true)
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk'
          },
      }
    ) ;
  
    console.log("res",res.data);
    setResponses(res.data);
    console.log(responses)
    
  } catch (error) {
    setIsloading(false);
    console.log(error);
  }finally{
    setIsloading(false);
  }
 };


 const getNewReleaseDetails = async ()=>{
  try {
    setIsloading(true)

    const res = await axios.get(
         `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk",
          },
        }
    );

    console.log(res.data);
    setResponses(res.data)
  

  } catch (error) {
    setIsloading(false)
    console.log(error)
  }
 };
   console.log(responses)


 const getCredits = async ()=>{

  try {
    setIsloading(true)

     const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
       {
          headers: {
               accept: "application/json",
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk",
               },
         }
     );

    console.log(res.data);
    setCast(res.data.cast.slice(0,6))
    console.log(responses)
    
  } catch (error) {
     setIsloading(false)
    console.log(error)
  }
 };

 const getSimilar = async ()=>{
  try {
    setIsloading(true)

    const res =await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
      {
        headers: {
               accept: "application/json",
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk",
               },
      },
    );
    console.log(res.data.results)
    setSmilars(res.data.results.slice(0,8))
    
  } catch (error) {
     setIsloading(false)

  }finally{
    setIsloading(false)
  }
 }

 const getSimilarTv = async ()=>{
  try {
    setIsloading(true)

    const res =await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`,
      {
        headers: {
               accept: "application/json",
                Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0ZWEyNjg4Mjc1ZmMyY2E1NDk4ZjE1ZjkwZTBlMCIsIm5iZiI6MTczMzEzOTg5MC4zOTM5OTk4LCJzdWIiOiI2NzRkOWRiMjEzYTdmMmRkMzU4MDYxNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nUDrAf7r-YUMMX7G584YAnWkwlxTJVoyOC9Ao7L8gSk",
               },
      },
    );
    console.log(res.data.results)
    setSmilars(res.data.results.slice(0,8))
    
  } catch (error) {
     setIsloading(false)

  }finally{
    setIsloading(false)
  }
 };


 useEffect(()=>{
  getMovieDetails();
  getNewReleaseDetails();
  getCredits();
  getSimilar();
  getSimilarTv();
  setResponses({});
  setIsloading(true);
  getMovieTrailer();
  getTvTrailer();
 }, [id])

 const navigate = useNavigate();

 const openDetails =(id)=>{
  navigate(`/details/${id}`);
 }

  return (
     <div className='bg-black text-white'>
       
       {isloading ? ("Loading...") : (trailerKey && (
        <div className='max-w-[1400px] m-auto mt-10'>
          <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width="100%"
          height="500px"
          controls={true}
          playing={false}
          />
        </div>
       ))}

      {isloading ?(
       <div className="flex items-center justify-center h-full">
            <div className="w-20 h-20 object-cover border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
      ):(
        <div className='flex max-w-[1400px] m-auto gap-[2rem] pt-[10rem] px-[2rem] '>

          <div>
           <img src={`https://image.tmdb.org/t/p/original${responses.poster_path}`} alt={responses.title} 
          className=" h-[550px] max-w-[500px] object-cover rounded-[1rem]"
          />
         </div>
             <div className='w-[65%] flex flex-col gap-4'>
             <div className='flex items-center gap-4 justify-between'>
                <h1 className='text-[32px] font-bold pb-[3rem]'>{responses.title || responses.name}</h1>
               <p className='flex items-center justify-between bg-red-600 gap-2 font-medium text-[16px] py-4 px-3 rounded-[1rem]'><AiOutlinePlus />Add to Favourite</p>
             </div>

               <div className='flex items-center gap-[1rem]'>
                <p className=" flex items-center gap-4">
                <div className="flex flex-wrap gap-2 font-semibold text-[16px]">
                   {responses.genres && responses.genres.length > 0  ? responses.genres.slice(0, 3).map((genre) => (
                          <span
                            key={genre.id}
                            className="px-6 py-2 bg-gray-200 text-[18px] text-gray-800 rounded-full text-sm">
                             {genre.name}
                           </span>
                                ))
                            : <span className="text-gray-500">N/A</span>}
                  </div>

             </p>

             <p className='flex items-center gap-2'><FaRegCalendarDays/> {responses.release_date || responses.first_air_date}</p>

              <p className='flex items-center gap-2 text-[16px] font-medium p-2'><IoTimerOutline/>{formatRuntime(responses.runtime)}</p>

             <span className='flex gap-2 items-center'><MdOutlineStarPurple500 />{responses.vote_average}</span>

             </div>

               <p className="mt-4 pb-[1rem]">{responses.overview}</p>
               
                <p>
              <strong>Country : </strong> {responses.production_countries?.map((c)=>c.name).join(' , ')}
              </p>

              <p className="mt-2">
               <strong>Genres:</strong>{' '}
              {responses.genres && responses.genres.length > 0
              ? responses.genres.map((genre) => genre.name).join(', ')
               : 'N/A'}
              </p>

               <p className="mt-2 ">
               <strong>Date Release : </strong> {responses.release_date || responses.first_air_date}
               </p>
              
               <p>
              <strong>Language : </strong> {responses.spoken_languages?.map((c)=>c.name).join(' , ')}
              </p>

              <p><strong>Production: </strong> {responses.production_companies?.map((c)=>c.name).join(' , ')}</p>

              {/* <p><strong>Cast: </strong> {cast.map((actors)=>actors.name).join(' , ')} </p> */}

              
            </div>
        </div>
      )}


       
       {/* You may Also like */}
      <div className='max-w-[1400px] m-auto pt-[8rem] px-[2rem]'>
        <div>
          <p className='font-semibold text-[24px] pb-[1rem]'>You may also like</p>
        </div>

        {isloading ? (
          <p>Loading...</p>
        ):(
          <div className='grid grid-cols-4 gap-10'>
        {similars.map((similar)=>(
          <ul key={similar.id}>
            <li className='cursor-pointer list-none'
            onClick={()=>openDetails(similar.id)}>

        <div 
          className='w-[300px] h-[344px] rounded-[1rem]'
          style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/original${similar.poster_path})`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
          }}
          ></div>

           <div className='flex items-center justify-between pt-4'>
               <p className='text-white font-medium text-[18px] whitespace-nowrap overflow-hidden text-ellipsis'>{similar.title}{similar.original_name}{similar.nam}</p>


               <div className='flex items-center gap-2'>
                <p className='bg-red-700 w-fit px-2 py-1 font-medium text-[16px] rounded-md whitespace-nowrap overflow-hidden text-ellipsis '>{similar.original_language}</p>

               <p className='border-[2px] py-1 px-2 rounded-lg border-red-700 flex items-center gap-2'><MdOutlineWatchLater size={25}/>{similar.seasons?.map((c)=>c.names).join(',')}</p>
               </div>
             </div>

            </li>
          </ul>
        ))}
      </div>
        )}
        
    </div>
       {/* end of You may Also like */}

       {/* comments */}
       <div className='max-w-[1400px] m-auto py-[8rem] px-[2rem] '>
        <div><p className='font-semibold text-[24px]'>Comments</p></div>

        {/* first comment */}
        <div className='flex gap-[2rem] pt-[3rem] font-normal text-[18px]'>
           <div>
            <img src={img1} alt="" />
          </div>

          <div>
            <p className='pb-3'>James</p>
            <input type="text" placeholder='Write your comments here.....' className='text-black w-[816px] h-[72px] px-3 rounded-lg' />
          </div>

        </div>
        {/* first comment */}
         
      {/* second comment */}
        <div className='flex gap-[2rem] pt-[3rem] font-normal text-[18px]'> 
          <div>
            <img src={img2} alt="" />
          </div>

         <div>
            <div>
              <p>Christian</p>
              <p className='py-1'>12/06/2020</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con</p>
           </div>

           <div className='flex gap-[2rem]'>
             <div className='flex items-baseline'>
               <BiLike size={30} />
               <p>10</p>
              </div>
             <div>
                <BiDislike size={30} />
             </div>
             <p>Reply</p>
           </div>
         </div>
         
        
        </div>
      {/* end  second comment */}

      {/* third comment */}
        <div className='flex gap-[2rem] pt-[3rem] font-normal text-[18px]'> 
          <div>
            <img src={img3} alt="" />
          </div>

         <div>
            <div>
              <p>Anastesia</p>
              <p className='py-1'>12/06/2020</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con</p>
           </div>

           <div className='flex gap-[2rem]'>
             <div className='flex items-baseline'> 
              <BiLike size={30} /> 
               <p>10</p>
             </div>
             <div>  <BiDislike size={30} /></div>
             <p>Reply</p>
           </div>
         </div>
         
        
        </div>
      {/* end  third comment */}

      {/* fourth comment */}
        <div className='flex gap-[2rem] pt-[3rem] font-normal text-[18px]'> 
          <div>
            <img src={img4} alt="" />
          </div>

         <div>
            <div>
              <p>Arlene</p>
              <p className='py-1'>12/06/2020</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con</p>
           </div>

           <div className='flex gap-[2rem]'>
             <div className='flex items-baseline'> 
              <BiLike size={30} /> 
               <p>10</p>
             </div>
             <div>  <BiDislike size={30} /></div>
             <p>Reply</p>
           </div>
         </div>
         
        
        </div>
      {/* end  fourth comment */}


       </div>
       {/* end of comments */}



    </div>
  )
}

export default Details