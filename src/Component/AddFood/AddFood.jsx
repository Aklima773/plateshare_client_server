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

        //console.log("Added a foods", name,photourl,quantity);

        const newFoods ={name,photourl,quantity, email:user?.email, contrinutor_name: user?.displayName};

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

    <form onSubmit={handleAddFoods} className='lg:w-1/2 mx-auto mt-25'>
     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend text-3xl">Add Foods</legend>

  <label className="label">Foods Title</label>
  <input type="text" className="input" name="name" placeholder="Title" />

  <label className="label">Image Url</label>
  <input type="text" className="input" name="photoUrl" placeholder="Image Link" />

  <label className="label">Foods Quantity</label>
  <input type="text" className="input" name="quantity" placeholder="Avialable Quantity" />

  <button className="btn btn-neutral mt-4">Add Food</button>
     </fieldset>
     </form>
     </Container>
        </>
    );
};

export default AddFood;