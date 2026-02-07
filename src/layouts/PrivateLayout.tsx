import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Page } from "konsta/react";
import TabBar from "../components/TabBar";
import { useAuth } from "../hooks/useAuth";
import LoadingPage from "../pages/LoadingPage";

const PrivateLayout = () => {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) return <div>{<LoadingPage />}</div>;

  // Redirect to login if not authenticated
  if (!user && isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Page>
        <header>
          <NavBar />
        </header>
        <div>
          <Outlet />
        </div>
        <div>
          <TabBar />
        </div>
      </Page>
    </>
  );
};

export default PrivateLayout;
