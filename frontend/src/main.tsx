import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { store } from "./slices/index.ts";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <App />
    </LocalizationProvider>
  </Provider>
);
