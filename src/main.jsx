import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "tailwindcss/tailwind.css";
import App from "./App.jsx";
import "./style.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
