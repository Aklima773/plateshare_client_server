import React from 'react';
import hero from './hero.jpg'
import { Link } from 'react-router';

const HeroBanner= () => {
    return (
       <>
  <div
  className="hero h-[550px]"
  style={{
    backgroundImage:
      `url(${hero})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className='md:ml-130 flex-col justify-end items-end gap-10'>
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Plate Share</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <Link to={'/allfoods'}><button className="btn bg-purple-500 border-purple-600 text-white">View All Foods</button></Link>
    </div>
    </div>
  </div>
</div>
       </>
    );
};

export default HeroBanner;