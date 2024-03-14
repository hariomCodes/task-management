import axios from "axios";
import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  const response = await axios.delete(`/api/tasks/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
}

export async function loader() {
  return redirect("..");
}
