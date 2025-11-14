import React, { useEffect,useState } from 'react';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import Container from '../../Component/Container/Container';
import HerobannerTwo from '../../Component/Hero2/HerobannerTwo';
import DetailsFood from '../../Component/DetailsFood/DetailsFood';

const AllFoods = () => {

  
  const [allFoods, setAllFoods] = useState([]);

  const [selectedFood, setSelectedFood] = useState({});

  //for modal 1
  const [openModal, setOpenModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  //step 2
  //to show modal
  // const myfoodsModalRef = useRef();

//   step 3
 //handle modal
 const myfoodsModalOpen = (food)=>{
    setSelectedFood(food); 
    setOpenModal(true);     
}



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
    <div className="flex flex-wrap gap-4">

        <HerobannerTwo/>

        <Container>

      <div className='mb-20'>
      <p className='mb-10 text-2xl font-bold text-purple-600'>Total Foods: ({allFoods.length})</p>
<div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mb-20">
      {allFoods.map(food => (
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
  );
};

export default AllFoods;
