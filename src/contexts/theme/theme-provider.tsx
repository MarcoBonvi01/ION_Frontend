import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  extendTheme,
} from "@mui/material/styles";
import { colorSchemes } from "../../styles/schema";
import type { Theme } from "@mui/material/styles";
import { components } from "../../styles/components/components";
import { typography } from "../../styles/typography";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme: Theme = extendTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
    colorSchemes: colorSchemes,
    components: components,
    direction: "ltr",
    shape: { borderRadius: 8 },
    typography: typography,
  });

  return (
    <CssVarsProvider
      theme={theme}
      defaultColorScheme="light"
      defaultMode="light"
      mode="light"
    >
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};
