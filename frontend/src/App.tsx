import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

export default function App() {
  const { token } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {token && <Navbar />}

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
