import React from "react";
import axios from "axios";
import { Form, redirect, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const response = await axios.put(`/api/tasks/${params.id}`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response.data;
}

export async function loader() {
  return redirect("..");
  //   try {
  //     const response = await axios.get(`/api/tasks/${params.id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       console.log("User session has expired. Redirecting to login page.");
  //       return redirect("/auth/login");
  //     }
  //     return [];
  //   }
}
