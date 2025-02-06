
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { FaEye  } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";


const Login = () => {

      const {signInUser,signInWithGoogle,user} = useContext(AuthContext);
      const [loginError,setLoginError] = useState('');
      const [success,setSuccess] = useState('');
      const [showPassword,setShowPassword] = useState(false);
      const emailRef = useRef(null);


      const handleLogin = e =>{
            e.preventDefault(); 
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(email,password)

            //reset error and success
setLoginError('');
setSuccess('')

            //signInUser
            signInUser(email,password)
            .then(result =>{
                  console.log(result.user)
                  setSuccess('User create Successfully')
//update profile
updateProfile(result.user,{
  
displayName : user.name,

photoURL:"https://example.com/jane-q-user/profile.jpg"


})
.then(() => console.log('profile updated'))
.catch()
// send Verification Email
sendEmailVerification(result.user)
.then(()=>{
  alert('Please check your email and verify your account')
})

if(result.user.emailVerified
                    
){
  setSuccess('User Logged in Successfully.')
}
else{
  alert('Please verify your email address.')
}          
                  
           e.target.reset();
           Navigate('/')
            })
            .catch(error => {console.error(error);
              setLoginError(error.message)
              
            })

            
      }



    const handleSignInGoogle = () =>{
      signInWithGoogle()
      .then(result=>{
        console.log(result.user)
      })
      .catch(error=>{
        console.error(error)
      })

      }

      const handleForgotPassword = () =>{
        const email = emailRef.current.value;
        if(!email){
          console.log('Please provide an email',emailRef.current.value)
          return;
        }
        else if (! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
          console.log('please write a valid email')
          return;
        }
        //send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
          alert('please check your email')
        })
        .catch(error =>{
          console.log(error.message)
        })
      }


      return (
            <div className="hero bg-base-200 ">
  <div className="hero-content flex-col ">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
         
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>


          <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="password" 
            
            className="input input-bordered" required />
             <span className="absolute top-3 right-3 text-[8px]" onClick={() => setShowPassword(!showPassword) } >{
                              showPassword ? <FaEye />: <FaEyeSlash />
                              }</span>
          </div>
          
 
         
          <label className="label">
            <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
       
       
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        loginError && <p className="text-red-900"> {loginError} </p>
      }
      {
        success && <p className="text-green-800"> {success} </p>
      }
      <div className="">
                 <p className="flex items-center m-2">Register Please<Link to={"/Register"}className="btn btn-link text-blue-900">Register</Link></p>
                 </div>
                 <p><button className="btn btn-link m-3" onClick={handleSignInGoogle} >Google</button></p>
    </div>
  </div>
</div>
      );
};

export default Login;