import React, { use, useRef, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const Login = () => {

  const {setErr, setSuccess,signInUser,signInWithGoogle} = use(AuthContext);

  //location state and uNavigate after logedin
  const location = useLocation();
  const navigate = useNavigate();

  //console.log(location);

  //pass show handle
  const [showPassword, setShowPassword] = useState(false);

  // password show button handle 


const handlShowPass = (e)=>{
  e.preventDefault();
  
  setShowPassword(!showPassword);
  
  }

   //forget password email refference catch

   const emailRef = useRef();
//forget password handle
const handleForgetPassword =()=>{
  const email = emailRef.current.value;

  sendPasswordResetEmail(auth,email)
  .then(()=>{
    toast.error('Please check your email')
  })
  .catch(err=>{
    console.log(err.message)
  })

}

//log in with google
const handleGoogleSignin = ()=>{
  signInWithGoogle()
  .then(res=>{
    console.log(res.user)
    setSuccess(true);
     navigate(location.state || '/')
    toast.success('Login successfully! 🎉', {
            position: 'top-right',
            autoClose: 3000,});
           
            

  })
  .catch(err=>{
    console.log(err)
    setErr(toast.error(err.message || 'Login failed 😞', {
            position: 'top-right',
          } ))
   
  })
}
  
//login
  const handleLogin =(e)=>{
    e.preventDefault();
    //console.log('loged in')
    const email = e.target.email.value;
      const password = e.target.password.value;

      signInUser(email,password)
      .then(()=>{
        //console.log(res.user)
        
        navigate(location.state || '/')
        // if(!res.user.emailVerified){
        //   setErr(
        //   toast.error('Please verify your email address 😞'))
        //   return;
        // }else{
        setSuccess(true);
        toast.success('Login successfully! 🎉', {
                position: 'top-right',
                autoClose: 3000,});
                e.target.reset();
                
               } 

      )
      .catch(err=>{
        //console.log(err)
        if(
          err.code === 'auth/user-not-found' || 
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/invalid-credential'
        ){
          toast.error('Email or Password not match', {
            position: 'top-right',
            autoClose: 3000,
          });
        }else if(err.code === 'auth/invalid-email'){
          toast.error('Invalid email format 😕', {
            position: 'top-right',
            autoClose: 3000,
          });
  
        }else{
          setErr(toast.error(err.message || 'Login failed 😞', {
            position: 'top-right',
          } ));
        }
        setErr(true);
        
      })
  }
    return (
    <>


     
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
     
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">

        <form action="" onSubmit={handleLogin}>
        <fieldset className="fieldset">
       
          <label className="label">Email</label>
          <input type="email" ref={emailRef}className="input" name='email' placeholder="Email" />
         
          <label className="label">Password</label>
          <div className='flex justify-center items-center relative mb-3'>
            
         
          <input type={showPassword? 'text' : 'password'} className="input focus:outline-none focus:ring-0" name='password' placeholder="Password" />

          {/* //show/hide button  */}

          <button onClick={handlShowPass} className='btn btn-xs absolute left-42'>{showPassword?<FaEye /> : <FaEyeSlash/> }</button>
          </div>
          <div><a onClick={handleForgetPassword} className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
          <button onClick={handleGoogleSignin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

<h3>Are You a new user? <Link to={'/register'}><a href="" className='text-blue-600 text-[14px]'>Register here!</a></Link></h3>

        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
        
    
    
    </>
    );
};

export default Login;