import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Resumen } from "../pages/Resumen";
import { Layout } from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/resumen",
        element: <Resumen />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
