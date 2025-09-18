import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app.tsx";

import "./index.css";

import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster theme="light" richColors />
  </StrictMode>,
);
