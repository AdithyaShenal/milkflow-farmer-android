import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { App } from "konsta/react";
import router from "./routes/routes";
import "./index.css";
import "leaflet/dist/leaflet.css";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      theme="material"
      dark={true}
      materialTouchRipple={true}
      safeAreas={true}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </App>
  </StrictMode>,
);
