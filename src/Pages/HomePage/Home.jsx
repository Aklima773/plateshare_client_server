import React from 'react';
import HeroBanner from '../../Component/Herobanner/HeroBanner';
import AllFoods from '../AllFoods/AllFoods';
import AvaialbleFoods from '../AvaialableFoods/AvaialbleFoods';
import Carosel from '../../Component/CarouselBanner/Carosel';
import Aboutus from '../../Component/AboutUs/Aboutus';


const Home = () => {
    return (
      <>
      <HeroBanner/>
      <Aboutus/>
      <AvaialbleFoods/>

      <Carosel/>
      
      </>
    );
};

export default Home;