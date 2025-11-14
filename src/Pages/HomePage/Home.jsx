import React from 'react';
import HeroBanner from '../../Component/Herobanner/HeroBanner';
import AllFoods from '../AllFoods/AllFoods';
import AvaialbleFoods from '../AvaialableFoods/AvaialbleFoods';
import Carosel from '../../Component/CarouselBanner/Carosel';


const Home = () => {
    return (
      <>
      <HeroBanner/>
      <AvaialbleFoods/>

      <Carosel/>
      
      </>
    );
};

export default Home;