import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";



export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to='/'/>
  },
]);