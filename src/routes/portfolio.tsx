import { Outlet } from "react-router-dom";
import { Layout } from "../components/layout/layout";

export const route = {
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [
    {
      path: "home/portfolio",
      lazy: async () => {
        const { Page } = (await import(
          "../pages/home/portfolio/portfolio-page"
        )) as { Page: React.FC };

        return { Component: Page };
      },
    },
    {
      path: "home/worker",
      lazy: async () => {
        const { Page } = (await import("../pages/home/worker/worker-page")) as {
          Page: React.FC;
        };

        return { Component: Page };
      },
    },
  ],
};
