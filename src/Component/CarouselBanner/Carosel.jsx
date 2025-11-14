import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';

const Carosel = () => {
    const [allFoods, setAllFoods] = useState([]);
const axiosSecure = useAxiosSecure();
//getting all food

  useEffect(() => {
    axiosSecure.get("/allfoods")
      .then(data => {
        console.log('All Foods', data.data);
        setAllFoods(data.data);
      })
      .catch(err => console.error(err));
  }, [axiosSecure]);


    return (
      <>
      <div className="carousel rounded-box mb-20">

        {allFoods.map(food=>(
  <div className="carousel-item flex-col">
    <h1>{food.name}</h1>
    <img
      src={food.photourl}
      className='w-50'
      alt="Burger" />
  </div>
))}
</div>
      </>
    );
};

export default Carosel;