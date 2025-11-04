import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AppContextProps {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // 🔁 Sincroniza token en localStorage
  React.useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  return (
    <AppContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
