import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import { store } from "./slices/index.ts";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.tsx";
import { BrowserRouter } from "react-router-dom";
import i18n from "./i18n.ts";
import { I18nextProvider } from "react-i18next";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AudioPlayerProvider>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </AudioPlayerProvider>
  </Provider>
);
