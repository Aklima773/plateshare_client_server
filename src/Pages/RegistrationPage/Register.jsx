import React, {use, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateProfile } from 'firebase/auth';
// import { sendEmailVerification } from 'firebase/auth';

const Register = () => {

  const {setErr,setSuccess, createUser} =use(AuthContext);

 //set password show toggle
 const [showPassword, setShowPassword] = useState(false);

 //show password
 const handlShowPass =(e)=>{
  e.preventDefault();
  setShowPassword(!showPassword)
 }


 //validation pattern

 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 //email pattern
 if(!emailPattern){
  setErr( toast.error('Please enter a valid email address.', {
    position: 'top-right',
  } ))
  return;
 }

  


 //handle registration
const handleRegistration = (e)=>{
e.preventDefault();

const name = e.target.name.value;
const email = e.target.email.value;
const photoUrl = e.target.photoUrl.value;
const password = e.target.password.value;
const terms = e.target.terms.checked;

//console.log(name, email, photoUrl, password,terms)


//validation pattern
//emailPattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//passwordPattern
const lengthPattern = /^.{6,}$/;
const casePattern = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
const specialPattern = /[!@#$%^&*(),.?":{}|<>]/ ; 



//email pattern
if(!emailPattern){
 setErr(toast.error('Please enter a valid email address.', {
   position: 'top-right',
 } ))
 return;
}

// password pattern 
if(!lengthPattern.test(password)){
  console.log('password didnt match')
    setErr( toast.error('Password must be at least 6 characters long ', {
    position: 'top-right',
  } ))
  return ;
}else if (!casePattern.test(password)){
    setErr( toast.error('Password must include at least one uppercase letter & one lowercase', {
    position: 'top-right',
  } ))
  return ;
}else if(!specialPattern.test(password)){
   setErr( toast.error('Password must include at least one special character', {
    position: 'top-right',
  } ))
  return ;
}

//terms verified
if(!terms){
  setErr( toast.error('Please accept our terms and conditions', {
    position: 'top-right',
  } ))
  return;
}
console.log(name, email, photoUrl, password,terms)

setErr(' ');
setSuccess(false);


//create user

createUser(email, password,name,photoUrl,terms)
.then((res)=>{
  console.log(res.user);
  setSuccess(true);
  toast.success('Registration complete successfully!', {
        position: 'top-right',
        autoClose: 3000,})
        e.target.reset();

        //update profile
        const profile ={
          displayName: name,
          email: email,
          photoURL: photoUrl,

        }

        updateProfile(res.user, profile)
        .then((res)=>{
          console.log(res);
          setSuccess(true);
          toast.success('User Profile Update Successfully!', {
            position: 'top-right',
            autoClose: 3000,})
        
        })
        .catch(()=>{
          toast.error('User Profile Updated failed', {
            position: 'top-right',
            autoClose: 3000,})
        })
 //update profile finish

 //send email verification
//  sendEmailVerification(res.user)
//         .then(()=>{
//           toast.error('Please verify your email address 😞',{
//         position: 'top-right'} )
//         })
   
//     })
//     .catch((err)=>{
//       console.log(err);
//       setErr(toast.error(err.message || 'Registration failed 😞', {
//         position: 'top-right',
//       } ))
     
    //send email verification finish

})
.catch((err)=>{
  console.log(err);
  if(err.code === 'auth/email-already-in-use'){
    toast.error('Email Already Register !')
  }else{
  setErr( toast.error(err.message || 'Registration failed 😞', {
    position: 'top-right',
  } ))
}

})





}


    return (
        <>
        
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
     
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">


        <form onSubmit={handleRegistration}>
        <fieldset className="fieldset">
        <label className="label">Name</label>
        <input type="text" className="input" name='name' placeholder="Your Name" />
          <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" />
          <label className="label">Photo Url</label>
          <input type="text" className="input" name='photoUrl' placeholder="Your Profile Link" />
          <label className="label">Password</label>
          <div className='flex justify-center items-center relative mb-3'>
            
         
          <input type={showPassword? 'text' : 'password'} className="input focus:outline-none focus:ring-0" name='password' placeholder="Password" />

          {/* //show/hide button  */}

          <button onClick={handlShowPass} className='btn btn-xs absolute left-55'>{showPassword?<FaEye /> : <FaEyeSlash/> }</button>
          </div>
          <div>
  <label className="label">
    <input type="checkbox"  name="terms" className="checkbox" />Accept Our Terms and Conditions.
  </label>
</div>

          <button className="btn btn-neutral mt-4">Register</button>
          <h3>Already Registered? <span className='text-[14px]'>Please </span> <Link to={'/login'}><a href="" className='text-blue-600 text-[14px]'>Login !</a></Link></h3>
        </fieldset>

        </form>
      </div>
    </div>
  </div>
</div>
        
        </>
    );
};

export default Register;