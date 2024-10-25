import { App } from "@/components/App";
import About from "@/pages/about/About";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense>
      }
    ]
  },
];

export const router = createBrowserRouter(routes);

export default routes;
