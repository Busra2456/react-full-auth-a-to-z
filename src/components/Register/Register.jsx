import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Register = () => {
      const {createUser} = useContext(AuthContext)
      const handleRegister = e =>{
            e.preventDefault(); 
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(name,email,password)

            //createUser
            createUser(email,password)
            .then(result =>{
                  console.log(result.user)
            })
            .catch(error => {console.error(error)})

            
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
                   <div className="form-control">
                     <label className="label">
                       <span className="label-text">Password</span>
                     </label>
                    
                     <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                     <label className="label">
                       <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                   </div>
                  
                  
                   <div className="form-control mt-6">
                     <button className="btn btn-primary">Register</button>
                   </div>
                 </form>
                 <div className="flex items-center m-2 ">
                 <p className="flex items-center m-2 ">Already have account? Please<Link to={"/Login"} className="btn btn-link text-blue-900">Register</Link></p>
                 </div>
               
               </div>
             </div>
           </div>
                 );
           };
           
           export default Register;