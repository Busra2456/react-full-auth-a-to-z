
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, Navigate } from "react-router-dom";

const Login = () => {

      const {signInUser,signInWithGoogle} = useContext(AuthContext);
      const handleLogin = e =>{
            e.preventDefault(); 
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(email,password)

            //signInUser
            signInUser(email,password)
            .then(result =>{
                  console.log(result.user)
           e.target.reset();
           Navigate('/')
            })
            .catch(error => {console.error(error)})

            
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
         
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
       
       
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="">
                 <p className="flex items-center m-2">Register Please<Link to={"/Register"}className="btn btn-link text-blue-900">Login</Link></p>
                 </div>
                 <p><button className="btn btn-link m-3" onClick={handleSignInGoogle} >Google</button></p>
    </div>
  </div>
</div>
      );
};

export default Login;