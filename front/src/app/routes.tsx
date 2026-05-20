import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
// import Radar from "./pages/Radar";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      // { path: "radar", Component: Radar },
      { path: "alerts", Component: Alerts },
      { path: "settings", Component: Settings },
    ],
  },
]);
