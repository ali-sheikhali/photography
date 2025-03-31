import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./routs/routs.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>
);
