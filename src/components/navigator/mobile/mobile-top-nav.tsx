import * as React from "react";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";

import { MobileNav as MobileNavigation } from "./mobile-nav-bar";
import type { NavItemType } from "../items";

// Mobile sidebar
type SideNavProps = {
  color?: "blend_in" | "discrete" | "evident";
  items?: NavItemType[];
};

export const MobileTopNavigationBar: React.FC<SideNavProps> = ({
  items = [],
}) => {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          "--MainNav-background": "var(--mui-palette-background-default)",
          "--MainNav-divider": "var(--mui-palette-divider)",
          bgcolor: "var(--MainNav-background)",
          left: 0,
          position: "sticky",
          pt: { lg: "var(--Layout-gap)" },
          top: 0,
          width: "100%",
          zIndex: "var(--MainNav-zIndex)",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid var(--MainNav-divider)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 auto",
            minHeight: "var(--MainNav-height)",
            px: { xs: 2, lg: 3 },
            py: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", flex: "1 1 auto" }}
          >
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: "none" } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>

          <UserButton />
        </Box>
      </Box>

      <MobileNavigation
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
};

function UserButton() {
  return (
    <React.Fragment>
      <Avatar
        sx={{ bgcolor: "var(--mui-palette-primary-main)", cursor: "pointer" }}
      >
        J
      </Avatar>
    </React.Fragment>
  );
}
