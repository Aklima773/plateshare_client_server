import React, { useEffect, useState } from 'react';
import Container from '../../Component/Container/Container';
import AllFoods from '../AllFoods/AllFoods';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import DetailsFood from '../../Component/DetailsFood/DetailsFood';
import useAuth from '../../CustomHook/useAuth';
import { useNavigate } from 'react-router';

const AvaialbleFoods = () => {
  const {user} =useAuth();
  const navigate = useNavigate();

    const [featuredFood, setFeaturedFood] = useState([]);

    const [selectedFood, setSelectedFood] = useState({});

    const axiosSecure = useAxiosSecure();

    // modal setting 

  //for modal 1
  const [openModal, setOpenModal] = useState(false);
   //handle modal
 const myfoodsModalOpen = (food)=>{
  if (!user) {
    // user not logged in → redirect
    navigate('/login');
    return;
}
  setSelectedFood(food); 
  setOpenModal(true);     
}

    useEffect(() => {
        axiosSecure.get("/featuredFoods")
          .then(data => {
            console.log('All Foods', data.data);
            setFeaturedFood(data.data);
          })
          .catch(err => console.error(err));
      }, [axiosSecure]);
    return (
      <>
   <div className="flex flex-wrap gap-4 mt-10">

<Container>

         
<p className='mb-10 text-2xl font-bold text-purple-600'>Total Foods: ({featuredFood.length})</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {featuredFood.map(food => (
        <div key={food._id} className="card bg-base-100 w-96 shadow-sm grid grid-col-2 gap-4">
          <figure>
            <img
              src={food.photourl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              alt={food.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {food.name}
              <div className="badge bg-purple-600 text-white">{food.status}</div>
            </h2>
            <p className='mt-4 text-purple-600'>Quantity: {food.quantity} people</p>
            <div className=' flex justify-between items-center mt-10'>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Expire at: {food.expire}</div>
            </div>
            <div className="card-actions justify-end">
              <button onClick={() =>myfoodsModalOpen(food)} className="badge badge-outline hover:bg-purple-600 hover:text-white cursor-pointer">View</button>
            </div>
            </div>
          </div>
        </div>
      ))}
</div>

{/* //modal render only when openModal true  */}
{openModal && (
    <DetailsFood
      selectedFood={selectedFood} 
      onClose={() => setOpenModal(false)} 
    />
  )}
</Container>
</div>
      
      </>
    );
};

export default AvaialbleFoods;