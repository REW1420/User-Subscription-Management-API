import { useEffect, useState } from "react";
import { useApi } from "@/api/api";
import { useAppContext } from "@/context/AppContext";

export default function Profile() {
  const api = useApi();
  const { user } = useAppContext();
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setInfo(res.data))
      .catch(console.error);
  }, []);

  if (!user) return <p> Inicia sesión para ver tu perfil.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👤 Perfil</h1>
      {info && (
        <pre className="bg-muted p-4 rounded mt-3">
          {JSON.stringify(info, null, 2)}
        </pre>
      )}
    </div>
  );
}
