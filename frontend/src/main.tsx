import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import { store } from "./slices/index.ts";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.tsx";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </Provider>
);
