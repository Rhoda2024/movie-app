import React from 'react'
import Home from '../components/Home'
import HeroSection from '../components/HeroSection'
import RecommendPage from '../components/RecommendPage'

function HomePage() {
  return (
    <div>
      <HeroSection/>
      <Home/>
      <RecommendPage/>
    </div>
  )
}

export default HomePage