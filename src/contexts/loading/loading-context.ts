import * as React from "react";

interface LoadingContextValue {
  showLoader: () => void;
  hideLoader: () => void;
}

export const LoadingContext = React.createContext<LoadingContextValue>({
  showLoader: () => {},
  hideLoader: () => {},
});
