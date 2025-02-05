import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRouter = ({children}) => {
      const {user,loading} = useContext(AuthContext);
      if(loading){
            return <span className="loading loading-spinner loading-lg" ></span>;
      }

      if(user){
            return children;
      }
      return (
            <Navigate to={"/Login"}>
                  
            </Navigate>
      );
};

export default PrivateRouter;
PrivateRouter.propTypes ={
      children: PropTypes.node 
}