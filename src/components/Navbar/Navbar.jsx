import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
  const {user,logOut} = useContext(AuthContext)

  const handleLogOut = () =>{
    logOut()
    .then(() => console.log('user logged out successfully'))
    .catch(error => console.error(error))
  }


      const links = <div className="grid grid-cols-1 text-[10px] space-x-3 p-2 text-blue-950 lg:flex">
      <NavLink to={'/'} className="hover:underline" >Home</NavLink>
      
      <NavLink to={'/Login'} className="hover:underline" >Login</NavLink>
      <NavLink to={'/Register'} className="hover:underline" >Register</NavLink>
      <NavLink to={'/Order'} className="hover:underline" >Order</NavLink>
      {
        user && <>
        <NavLink to={'/Profile'} className="hover:underline" >Profile</NavLink>
        
        </>
      }
      </div>
      return (
          <div > 
          <div className="navbar bg-base-100 shadow-sm ">
          <div className="navbar-start">
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex={0}
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 p-2 shadow ">
{links}
               </ul>  
            </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ">
             {links}
            </ul>
          </div>
          <div className="navbar-end">
            {
              user ? <>
              <span> {user.email} </span> 
              <a onClick={handleLogOut} className="btn">Sign out</a> </>
             : <Link to={'/Login'}><button>Login</button></Link> 
            }
            
            
          </div>
        </div></div>
      );
};

export default Navbar;