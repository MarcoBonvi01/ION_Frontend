import { chipClasses, type ChipProps } from "@mui/material/Chip";
import type { Theme } from "@mui/material/styles";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";

function getSoftVars(color: string, dark: boolean) {
  if (dark) {
    return {
      "--Chip-softBg": `var(--mui-palette-${color}-800)`,
      "--Chip-softColor": `var(--mui-palette-${color}-200)`,
      "--Chip-softDisabledBg": `var(--mui-palette-${color}-800)`,
      "--Chip-softDisabledColor": `var(--mui-palette-${color}-500)`,
      "--Chip-softHoverBg": `var(--mui-palette-${color}-700)`,
      "--Chip-softDeleteIconColor": `var(--mui-palette-${color}-200)`,
      "--Chip-softDeleteIconHoverColor": `var(--mui-palette-${color}-50)`,
    };
  }

  return {
    "--Chip-softBg": `var(--mui-palette-${color}-100)`,
    "--Chip-softColor": `var(--mui-palette-${color}-700)`,
    "--Chip-softDisabledBg": `var(--mui-palette-${color}-50)`,
    "--Chip-softDisabledColor": `var(--mui-palette-${color}-400)`,
    "--Chip-softHoverBg": `var(--mui-palette-${color}-200)`,
    "--Chip-softDeleteIconColor": `var(--mui-palette-${color}-700)`,
    "--Chip-softDeleteIconHoverColor": `var(--mui-palette-${color}-800)`,
  };
}

export const MuiChip = {
  defaultProps: {
    color: "secondary" as const, // default will be removed in material v6
    deleteIcon: <XCircleIcon />,
  },
  styleOverrides: {
    root: { borderRadius: "8px", fontWeight: 500 },
    outlinedSecondary: ({ theme }: { theme: Theme }) => {
      // Custom case for secondary, the rest is handled by the theme

      if (theme.palette.mode === "dark") {
        return {
          borderColor: "var(--mui-palette-secondary-700)",
          color: "var(--mui-palette-secondary-50)",
        };
      }

      return {
        borderColor: "var(--mui-palette-secondary-200)",
        color: "var(--mui-palette-secondary-900)",
      };
    },
    soft: ({ ownerState }: { ownerState: ChipProps }) => {
      return {
        backgroundColor: "var(--Chip-softBg)",
        color: "var(--Chip-softColor)",
        ...(ownerState.disabled && {
          backgroundColor: "var(--Chip-softDisabledBg)",
          color: "var(--Chip-softDisabledColor)",
        }),
        ...(ownerState.clickable && {
          "&:hover": { backgroundColor: "var(--Chip-softHoverBg)" },
        }),
        [`& .${chipClasses.deleteIcon}`]: {
          color: "var(--Chip-softDeleteIconColor)",
          "&:hover": { color: "var(--Chip-softDeleteIconHoverColor)" },
        },
        "&.Mui-focusVisible": { backgroundColor: "var(--Chip-softHoverBg)" },
      };
    },
    softPrimary: ({ theme }: { theme: Theme }) => {
      return getSoftVars("primary", theme.palette.mode === "dark");
    },
    softSecondary: ({ theme }: { theme: Theme }) => {
      return getSoftVars("secondary", theme.palette.mode === "dark");
    },
    softSuccess: ({ theme }: { theme: Theme }) => {
      return getSoftVars("success", theme.palette.mode === "dark");
    },
    softInfo: ({ theme }: { theme: Theme }) => {
      return getSoftVars("info", theme.palette.mode === "dark");
    },
    softWarning: ({ theme }: { theme: Theme }) => {
      return getSoftVars("warning", theme.palette.mode === "dark");
    },
    softError: ({ theme }: { theme: Theme }) => {
      return getSoftVars("error", theme.palette.mode === "dark");
    },
    iconSmall: { fontSize: "var(--icon-fontSize-sm)" },
    iconMedium: { fontSize: "var(--icon-fontSize-md)" },
  },
};
