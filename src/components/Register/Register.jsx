import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { FaEye  } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
      const {createUser} = useContext(AuthContext);
       const [loginError,setLoginError] = useState('');
            const [success,setSuccess] = useState('');
            const [showPassword,setShowPassword] = useState(false);

      const handleRegister = e =>{
            e.preventDefault(); 
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const accepted = e.target.terms.checked
            console.log(name,email,password,accepted)
              //reset error
      setLoginError('');
      setSuccess('')

            if(password.length < 6){
              setLoginError('Password should be at least 6 characters or longer');
              return;
             }
             else if (!/[A-Z]/.test(password)){
              setLoginError('Your password should have at least one upper case characters.')
              return;
             }
        
             else if(!accepted){
              setLoginError('please accept our terms and conditions!')
             }

            //createUser
            createUser(email,password)
            .then(result =>{
                  console.log(result.user)
                  setSuccess('User create Successfully')
                  // update profile
                  updateProfile(result.user , {
                    displayName: name,
                    photoURL:"https://example.com/jane-q-user/profile.jpg"
              })
              .then(()=> console.log('profile updated'))
              .catch()

                // send Verification Email
            sendEmailVerification(result.user)
            .then(()=>{
                  alert('Please check your email and verify your account')
            })
      })
      .catch(error =>{
           console.log(error);
           setLoginError(error.message)
      })         

}


          
                 return (
                       <div className="hero bg-base-200 ">
             <div className="hero-content flex-col ">
               <div className="text-center ">
                 <h1 className="text-5xl font-bold">Register New!</h1>
                 
                 
               </div>
               <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                 <form onSubmit={handleRegister } className="card-body">
                  {/*  */}
                  <div className="form-control">
                     <label className="label">
                       <span className="label-text">Name</span>
                     </label>
                    
                     <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    
                   </div>
                   {/*  */}



                   <div className="form-control">
                     <label className="label">
                       <span className="label-text">Email</span>
                     </label>
                    
                     <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                   </div>
                   
                   
                   <div className="form-control ">
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
                    <br />

                    <div className="mb-4 flex" >
<input type="checkbox" name="terms" id="terms" />
<label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a> </label>
</div>
                 
                     <label className="label">
                       <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                   </div>
                  
                  
                   <div className="form-control mt-6">
                     <button className="btn btn-primary">Register</button>
                   </div>
                 </form>
                 {
        loginError && <p className="text-red-900"> {loginError} </p>
      }
      {
        success && <p className="text-green-800"> {success} </p>
      }
                 <div className="flex items-center m-2 ">
                 <p className="flex items-center m-2 ">Already have account? Please<Link to={"/Login"} className="btn btn-link text-blue-900">Login</Link></p>
                 </div>
               
               </div>
             </div>
           </div>
                 );
           };
           
           export default Register;