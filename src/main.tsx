import dayjsObjectSupport from "dayjs/plugin/objectSupport";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsUtc from "dayjs/plugin/utc";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";

import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsUtc);
dayjs.extend(dayjsObjectSupport);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
