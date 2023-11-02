import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import NewProducts from './pages/NewProducts';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    errorElement : <NotFound/>,
    children : [
      {
        path : "/products",
        element : <AllProducts/>
      },
      {
        path : "/products/new",
        element : <NewProducts/>
      },
      {
        path : "/cart",
        element : <MyCart/>
      }
    ]
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
