import dayjs from "dayjs";

import "dayjs/locale/it";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/theme/theme-provider";
import { LoadingProvider } from "./contexts/loading/loading-provider";
import { Toaster } from "sonner";

const queryClient = new QueryClient({});

export function Root({ children }: { children: React.ReactNode }) {
  dayjs.locale("it");

  return (
    <ThemeProvider>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LoadingProvider>

      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
}
