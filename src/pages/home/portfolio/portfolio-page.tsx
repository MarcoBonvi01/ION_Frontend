import { Box, Card, Divider, Grow, Stack, Typography } from "@mui/material";
import React from "react";
import { RiseLoader } from "react-spinners";
import { TablePaginationContext } from "../../../contexts/table-pagination/table-pagination-context";
import { fetchPortfolio } from "../../../api/portfolio";
import { CustomPagination } from "../../../components/pagination/custom-table-pagination";
import { useQuery } from "@tanstack/react-query";
import { PortfolioTable } from "../../../components/tables/portfolio-table";
import type { Portfolio } from "../../../interfaces/portfolio";

interface SortedBy {
  ID: number;
  name: string;
}

export function Page() {
  const { setFrom, from, currentPage, setCurrentPage, pageSize } =
    React.useContext(TablePaginationContext);

  const filter: React.RefObject<{ [key: string]: string | number }> =
    React.useRef({
      status: 1,
    });

  const [sortedBy, setSortedBy] = React.useState<SortedBy>({
    ID: 0,
    name: "name",
  });

  const [sortDirection, setSortDirection] = React.useState<"ASC" | "DESC">(
    "DESC"
  );

  const {
    data,
    isLoading: isLoadingPortfolio,
    isFetching: isFetchingPortfolio,
    isPending: isPendingPortfolio,
    isError: isErrorPortfolio,
    error: errorPortfolio,
  } = useQuery<{ count: number; portfolio: Portfolio }>({
    queryKey: ["portfolio", sortedBy, sortDirection, pageSize, currentPage],
    queryFn: () => {
      return fetchPortfolio(
        filter.current,
        currentPage,
        pageSize,
        sortedBy,
        sortDirection
      );
    },
  });

  React.useEffect(() => {
    if (filter.current) {
      if (currentPage != 0) setCurrentPage(0);
      if (from != 0) setFrom(0);
    }
  }, [filter.current, setFrom, setCurrentPage, currentPage, from]);

  if (errorPortfolio) {
    console.error("error");
    console.error(errorPortfolio);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack p={3} spacing={4} alignItems="center" justifyContent="center">
          <RiseLoader color="var(--mui-palette-primary-main)" size={10} />

          <Typography variant="h6">
            C'è stato un errore durante il reperimento dei dati...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          maxWidth: "var(--Content-maxWidth)",
          m: "var(--Content-margin)",
          p: "var(--Content-padding)",
          width: "var(--Content-width)",
        }}
      >
        <Grow in timeout={500}>
          <Card>
            <Divider />

            <PortfolioTable
              portfolio={
                isFetchingPortfolio || !data
                  ? { companies: [] }
                  : data.portfolio
              }
              setSortedBy={setSortedBy}
              setSortDirection={setSortDirection}
              sortDirection={sortDirection}
              sortedBy={sortedBy}
              isLoading={
                isLoadingPortfolio ||
                isErrorPortfolio ||
                isFetchingPortfolio ||
                isPendingPortfolio
              }
            />

            <Divider />

            <CustomPagination
              count={isFetchingPortfolio || !data ? 0 : data.count}
            />
          </Card>
        </Grow>
      </Box>
    </React.Fragment>
  );
}
