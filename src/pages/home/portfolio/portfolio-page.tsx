import {
  Box,
  Card,
  Divider,
  Grow,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { RiseLoader } from "react-spinners";
import { TablePaginationContext } from "../../../contexts/table-pagination/table-pagination-context";
import { fetchPortfolio } from "../../../api/portfolio";
import { CustomPagination } from "../../../components/pagination/custom-table-pagination";
import { useQuery } from "@tanstack/react-query";
import { PortfolioTable } from "../../../components/tables/portfolio-table";
import type { Portfolio } from "../../../interfaces/portfolio";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

interface SortedBy {
  ID: number;
  name: string;
}

export function Page() {
  const [search, setSearch] = React.useState<string>("");

  const { setFrom, from, currentPage, setCurrentPage, pageSize } =
    React.useContext(TablePaginationContext);

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
    queryKey: [
      "portfolio",
      search,
      sortedBy,
      sortDirection,
      pageSize,
      currentPage,
      from,
    ],
    queryFn: () => {
      return fetchPortfolio(
        currentPage,
        pageSize,
        sortedBy,
        sortDirection,
        search
      );
    },
  });

  React.useEffect(() => {
    if (search.length > 0) {
      if (currentPage != 0) setCurrentPage(0);
      if (from != 0) setFrom(0);
    }
  }, [search]);

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
        <Stack spacing={4}>
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">Portfolio</Typography>
          </Box>

          <Grow in timeout={500}>
            <Card>
              <Input
                fullWidth
                placeholder="Cerca"
                onChange={(event) => setSearch(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon />
                  </InputAdornment>
                }
                sx={{ px: 3, py: 2 }}
              />

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
        </Stack>
      </Box>
    </React.Fragment>
  );
}
