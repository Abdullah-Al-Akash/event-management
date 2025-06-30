import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-7xl mx-auto">
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App></App>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  </StrictMode>
);
