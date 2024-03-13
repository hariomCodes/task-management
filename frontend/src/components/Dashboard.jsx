import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ request, params }) {
  const response = await axios.get("/api/tasks/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  console.log(response);
  return response.data;
}

export default function Dashboard() {
  const tasks = useLoaderData();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <ul className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 shadow rounded-md">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
