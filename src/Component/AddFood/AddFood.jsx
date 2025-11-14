import React from 'react';
import Container from '../Container/Container';
import { toast } from 'react-toastify';
import useAuth from '../../CustomHook/useAuth';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';


const AddFood = () => {

    //user calling

    const {user} =useAuth();

    // const axiosIntance = useAxios();

    // axiosinstance from useAxiosSecure 

    const axiosSecure = useAxiosSecure();

    const handleAddFoods =(e)=>{
        e.preventDefault();

        const name = e.target.name.value;
        const photourl = e.target.photoUrl.value;
        const quantity = e.target.quantity.value;
        const location = e.target.location.value;
        const expire = e. target.expire.value;
        const description = e.target.description.value;
        const status = e.target.status.value;


        //console.log("Added a foods", name,photourl,quantity);

        const newFoods ={name,photourl,quantity,location,expire,description,status, contributor_email:user?.email, contrinutor_name: user?.displayName};

       axiosSecure.post("/addfoods", newFoods)
        .then(data=>{
            console.log(data.data)
            if(data.data.insertedId){
                toast.success('Created Successfully')
            }
            e.target.reset();
        })
    }
    return (
        <>
        <Container>

    <form onSubmit={handleAddFoods} className='w-full max-w-md mx-auto mt-20 p-6  rounded-xl shadow-md bg-white'>
     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend text-3xl">Add Foods</legend>

  <label className="label">Foods Title</label>
  <input type="text" className="input placeholder-gray-400 placeholder-opacity-70" name="name" placeholder="Title" />

  <label className="label">Image Url</label>
  <input type="text" className="input placeholder-gray-400 placeholder-opacity-70" name="photoUrl" placeholder="Image Link" />

  <label className="label">Foods Quantity</label>
  <input type="number" className="input placeholder-gray-400 placeholder-opacity-70" name="quantity" placeholder="Avialable Quantity" />

  <label className="label">Pickup Location</label>
  <input type="text" className="input placeholder-gray-400 placeholder-opacity-70" name="location" placeholder="Pickup Location" />

  <label htmlFor="expire" className="label">Expire Date</label>
<input
  id="expire"
  type="date"
  className="input placeholder-gray-400 placeholder-opacity-70"
  name="expire"
  placeholder="Expire Date"
  min={new Date().toISOString().split("T")[0]} 
  max="2030-12-31"  
/>

<label className="label">Status</label>
<input type="text" className="input placeholder-gray-400 placeholder-opacity-70" value="Available" readOnly name="status" placeholder="Pickup Location" />

<label className="label">Additional Notes</label>
<textarea 
  className="textarea textarea-bordered w-full placeholder-gray-400 placeholder-opacity-70" 
  name="description" 
  placeholder="Write something about the food..."
></textarea>

  <button className="btn bg-purple-600 text-white text-xl mt-4">Add Food</button>
     </fieldset>
     </form>
     </Container>
        </>
    );
};

export default AddFood;