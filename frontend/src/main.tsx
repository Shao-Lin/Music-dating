import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { registerSW } from "virtual:pwa-register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <App />
    </LocalizationProvider>
  </StrictMode>
);
