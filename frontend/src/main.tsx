import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import App from "./App";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/ProtectedRoute";
import "./index.css";
import Users from "./pages/User";
import Plans from "./pages/Plans";
import Subscriptions from "./pages/Subscriptions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout principal que incluye la Navbar
    children: [
      // Rutas públicas
      { path: "login", element: <Login /> },

      // Rutas protegidas
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },

      {
        path: "plans",
        element: (
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
