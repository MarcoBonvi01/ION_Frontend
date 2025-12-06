import { Root } from "./root";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const root = createRoot(document.getElementById("root")!);

const router = createBrowserRouter([
  {
    element: (
      <Root>
        <Outlet />
      </Root>
    ),
    children: [...routes],
  },
]);

root.render(<RouterProvider router={router} />);
