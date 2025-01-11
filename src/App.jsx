import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavBar from './components/NavBar';
import SeeMore from './components/SeeMore';
import HeroSection from './components/HeroSection';
import Details from './components/Details';
import SeeMoreNewRelase from './components/SeeMoreNewRelase';
import SeeMoreSeriesPage from './components/SeeMoreSeriesPage';
import SeeMoreRecommendPage from './components/SeeMoreRecommendPage';
import RecommendPage from './components/RecommendPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/hero" element={<HeroSection/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/seeMore" element={<SeeMore />} />
        <Route path='/seeMoreNew' element={<SeeMoreNewRelase/>} />
        <Route path="/details/:id" element={<Details />} />
        <Route path='/MoreSeries' element={<SeeMoreSeriesPage/>}/>
        <Route path='/MoreRecommend' element={<SeeMoreRecommendPage/>}/>
        <Route path='/recommend' element={<RecommendPage/>} />
      </Routes>
    </div>
  );
}

export default App;
