import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import ErrorPage from "./error-page";
import Signup, { action as signupAction } from "./components/Signup";
import AuthLayout from "./components/AuthLayout";
import Login, { action as loginAction } from "./components/Login";
import Root from "./routes/root";
import Dashboard, { loader as taskLoader } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: "dashboard", element: <Dashboard />, loader: taskLoader },
  {
    path: "auth",
    element: <AuthLayout />,

    children: [
      { path: "signup", element: <Signup />, action: signupAction },
      { path: "login", element: <Login />, action: loginAction },
    ],
  },
]);
