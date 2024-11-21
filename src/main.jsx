import { createRoot } from "react-dom/client";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "tailwindcss/tailwind.css";
import App from "./App.jsx";
import "./style.css";
import { Provider } from "react-redux";
import Store from "./store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
  <Provider store={Store}>
    <App />
  </Provider>
  </>
);
