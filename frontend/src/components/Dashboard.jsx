import axios from "axios";
import React from "react";
import { Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import Task from "./Task";

export async function loader() {
  try {
    const response = await axios.get("/api/tasks/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      console.log("User session has expired. Redirecting to login page.");
      return redirect("/auth/login");
    }
    return [];
  }
}

export default function Dashboard() {
  const tasks = useLoaderData();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      {/* <div className="inline-block bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-auto mb-4 rounded"> */}
      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-4 rounded mr-2"
      >
        <Link to={"create"}>Create Task</Link>
      </button>
      {/* </div> */}

      <Outlet />
      <ul className="grid grid-cols-1 gap-4">
        {tasks.map((task) => {
          return <Task {...task} key={task.id} />;
        })}
      </ul>
    </div>
  );
}
