import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Feed from "./pages/Feed.tsx";
import { CreateReport } from "./pages/CreateReport.tsx";
import FeedCardOpen from "./components/FeedCardOpen.tsx";
import CameraView from "./pages/CameraView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/feedcard",
    element: <FeedCardOpen />,
  },
  {
    path: "/report",
    element: <CreateReport />,
  },
  {
    path: "/camera",
    element: <CameraView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
