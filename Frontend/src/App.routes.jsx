import { createBrowserRouter } from "react-router";
import Login from "./Features/Auth/Pages/Login";
import Register from "./Features/Auth/Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h2>Welcome To Insta Clone Website</h2>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);
