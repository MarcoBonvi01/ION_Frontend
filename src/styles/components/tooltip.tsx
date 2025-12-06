import type { Components, Theme } from "@mui/material";

export const MuiTooltip: Components<Theme>["MuiTooltip"] = {
  defaultProps: { placement: "top" },
  styleOverrides: { tooltip: { backdropFilter: "blur(6px)" } },
};
