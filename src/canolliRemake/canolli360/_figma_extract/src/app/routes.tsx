import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { FinancePage } from "./pages/finance";
import { CampaignsPage } from "./pages/campaigns";
import { RetentionPage } from "./pages/retention";
import { SettingsPage } from "./pages/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: FinancePage },
      { path: "campaigns", Component: CampaignsPage },
      { path: "retention", Component: RetentionPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
