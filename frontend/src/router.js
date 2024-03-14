import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import Signup, { action as signupAction } from "./components/Signup";
import AuthLayout from "./components/AuthLayout";
import Login, { action as loginAction } from "./components/Login";
import { action as logutAction } from "./components/Logout";
import Root, { loader as rootLoader } from "./routes/root";
import Dashboard, { loader as taskLoader } from "./components/Dashboard";
import TaskCreate, {
  action as taskCreateAction,
} from "./components/TaskCreate";
import {
  action as taskEditAction,
  loader as taskEditLoader,
} from "./components/TaskEdit";
import {
  action as taskDeleteAction,
  loader as taskDeleteLoader,
} from "./components/TaskDelete";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: taskLoader,
        children: [
          { path: "create", element: <TaskCreate />, action: taskCreateAction },
          {
            path: "edit/:id",

            action: taskEditAction,
            loader: taskEditLoader,
          },
          {
            path: "delete/:id",
            action: taskDeleteAction,
            loader: taskDeleteLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,

        children: [
          { path: "signup", element: <Signup />, action: signupAction },
          { path: "login", element: <Login />, action: loginAction },
          { path: "logout", action: logutAction },
        ],
      },
    ],
  },
]);
