import type { Components, Theme } from "@mui/material";

export const MuiInputLabel: Components<Theme>["MuiInputLabel"] = {
  styleOverrides: {
    root: { maxWidth: "100%", position: "static", transform: "none" },
  },
};
