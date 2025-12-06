import * as React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";

import { VerticalLayout } from "./vertical-layout";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "72px",
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      />

      <div>
        <VerticalLayout>{children}</VerticalLayout>
      </div>
    </React.Fragment>
  );
};
