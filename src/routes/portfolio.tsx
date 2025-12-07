import { Outlet } from "react-router-dom";
import { Layout } from "../components/layout/layout";
import { TablePaginationProvider } from "../contexts/table-pagination/table-pagination-provider";

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

        return {
          Component: () => (
            <TablePaginationProvider>
              <Page />
            </TablePaginationProvider>
          ),
        };
      },
    },
    {
      path: "home/worker",
      lazy: async () => {
        const { Page } = (await import("../pages/home/worker/worker-page")) as {
          Page: React.FC;
        };

        return {
          Component: () => (
            <TablePaginationProvider>
              <Page />
            </TablePaginationProvider>
          ),
        };
      },
    },
  ],
};
