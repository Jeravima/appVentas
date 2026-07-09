import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Settings } from "../pages/Settings";
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
        path: "/settings",
        element: <Settings />,
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
