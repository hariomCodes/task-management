import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("accessToken");
  return redirect("/");
}
