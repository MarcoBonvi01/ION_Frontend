import type { Components, Theme } from "@mui/material";

export const MuiMenu: Components<Theme>["MuiMenu"] = {
  defaultProps: { disableScrollLock: true },
  styleOverrides: {
    list: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: "8px",
    },
  },
};
