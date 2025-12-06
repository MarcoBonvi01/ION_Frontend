import * as React from "react";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { RiseLoader } from "react-spinners";
import { LoadingContext } from "./loading-context";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = React.useState<{
    isLoading: boolean;
    title?: string;
  }>({
    isLoading: false,
    title: undefined,
  });

  const showLoader = React.useCallback(
    (title = "Loading in progress...") =>
      setState({ isLoading: true, title: title }),
    []
  );
  const hideLoader = React.useCallback(
    () => setState({ isLoading: false }),
    []
  );

  React.useEffect(() => {
    if (state.isLoading) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable lo scrolling
    }

    // Cleanup for restoring scrolling in case of unmount component
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isLoading]);

  return (
    <LoadingContext.Provider value={{ showLoader, hideLoader }}>
      {state.isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack p={3} spacing={4} alignItems="center" justifyContent="center">
            <RiseLoader color="white" size={10} />
            <Typography variant="h6" style={{ color: "white" }}>
              {state.title}
            </Typography>
          </Stack>
        </Box>
      )}

      {children}
    </LoadingContext.Provider>
  );
};
