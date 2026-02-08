import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/LoginPage";
import PrivateLayout from "../layouts/PrivateLayout";
import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/homePage",
        element: <HomePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);

export default router;
