import { createRoot } from "react-dom/client";
import { App } from "@/components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "@/pages/about";
import { Suspense } from "react";
import { router } from "./router/Router";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}



const container = createRoot(root);
container.render(<RouterProvider router={router} />);
