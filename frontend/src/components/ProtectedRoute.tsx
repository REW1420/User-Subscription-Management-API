import { Navigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAppContext();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
