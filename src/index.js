import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigate, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import NewProducts from './pages/NewProducts';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';
import { useAuthContext } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 유저 관리자 인증
const ProtectRoute = ({ checkAdmin, children }) => {
  const { user } = useAuthContext();
  if (!user || (checkAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />
  }
  return children;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/products",
        element: <AllProducts />
      },
      {
        path: "/products/new",
        element:
          <ProtectRoute checkAdmin>
            <NewProducts />
          </ProtectRoute>
      },
      {
        path: "/cart",
        element: <MyCart />
      }
    ]
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
