/* eslint-disable react-refresh/only-export-components */

import { CaretLeft as CaretLeftIcon } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import type { Components, Theme } from "@mui/material";

const NextIcon = () => <CaretRightIcon fontSize="var(--fontSize-md)" />;
const PrevIcon = () => <CaretLeftIcon fontSize="var(--fontSize-md)" />;

export const MuiTablePagination: Components<Theme>["MuiTablePagination"] = {
  defaultProps: {
    slotProps: {
      actions: {
        nextButtonIcon: {
          component: NextIcon,
        },
        previousButtonIcon: {
          component: PrevIcon,
        },
      },
      select: { size: "small", variant: "outlined" },
    },
  },
  styleOverrides: { input: { marginRight: "16px", padding: 0 } },
};
