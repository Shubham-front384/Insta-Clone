import { RouterProvider } from "react-router";
import { router } from "../src/App.routes";

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
