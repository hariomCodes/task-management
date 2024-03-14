import "../index.css";

import { Outlet, useLoaderData } from "react-router-dom";

import Navbar from "../components/Navbar";
import axios from "axios";

export async function loader() {
  try {
    const response = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
    return response.json();
  } catch (error) {
    return {};
  }
}

export default function Root() {
  const { username } = useLoaderData();
  return (
    <>
      <Navbar userName={username} />
      <h1 className="text-4xl font-bold mb-4 text-center">Task Manager</h1>
      <Outlet />
    </>
  );
}
