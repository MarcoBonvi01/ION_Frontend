import { Outlet } from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { NotFoundPage } from "../pages/not-found/not-found";
import { route as portfolioRoute } from "./portfolio";

export const routes = [
  portfolioRoute,
  { path: "/*", element: <NotFoundPage /> },
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
  },
];
