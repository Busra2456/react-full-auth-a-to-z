import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Register from './components/Register/Register.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Order from './components/Order/Order.jsx';
import Profile from './components/Profile/Profile.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRouter from './Router/PrivateRouter.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {path:"/",
        element:<Home></Home>

      },
      {
        path:"/Login",
        element:<Login></Login>
      },
      {
        path:"/Register",
        element:<Register></Register>
      },
      {
        path:"/Order",
        element:<PrivateRouter><Order></Order></PrivateRouter>
      },
      {
        path:"/Profile",
        element:<PrivateRouter><Profile></Profile></PrivateRouter>
      }
      
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)