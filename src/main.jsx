import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import ErrorPage from './assets/pages/error-page.jsx'
import Home from './assets/pages/home'
import Signup from './assets/pages/signup';
import Login from './assets/pages/login';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
  },
  {
    path:"/signup",
    element:<Signup/>
  }, 
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/home",
    element:
    (
    <Home/>
    )
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
