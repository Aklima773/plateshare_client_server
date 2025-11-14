import React from 'react';
import hero2 from './hero2.jpg'

const HerobannerTwo = () => {
    return (
        <div>
              <div
  className="hero w-screen h-[300px]"
  style={{
    backgroundImage:
      `url(${hero2})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content">
  <div className="max-w-md ml-10">
    <h1 className="text-2xl md:text-4xl font-bold md:text-left mr-30">All Available Foods!</h1>
  </div>
</div>
</div>
        </div>
    );
};

export default HerobannerTwo;