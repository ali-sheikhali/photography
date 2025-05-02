import { createContext, useState, useEffect } from "react";
import { getToken, logoutUser } from "../services/authServices";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;  
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
