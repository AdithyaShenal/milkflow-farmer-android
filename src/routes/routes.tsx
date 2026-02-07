import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/LoginPage";
import PrivateLayout from "../layouts/PrivateLayout";
import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import HelpPage from "../pages/HelpPage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
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
      {
        path: "/helpPage",
        element: <HelpPage />,
      },
    ],
  },
]);

export default router;
