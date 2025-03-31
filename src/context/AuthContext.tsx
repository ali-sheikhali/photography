import { createContext, useState, useEffect } from "react";
import { getToken, logoutUser } from "../services/authServices";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
