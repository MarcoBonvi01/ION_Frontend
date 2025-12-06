import { Box, Card, Divider, Grow, Stack, Typography } from "@mui/material";
import React from "react";
import { RiseLoader } from "react-spinners";
import { TablePaginationContext } from "../../../contexts/table-pagination/table-pagination-context";
import { CustomPagination } from "../../../components/pagination/custom-table-pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchWorks } from "../../../api/work";
import { WorkTable } from "../../../components/tables/worker-table";

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
    isLoading: isLoadingWork,
    isFetching: isFetchingWork,
    isPending: isPendingWork,
    isError: isErrorWork,
    error: errorWork,
  } = useQuery<{ count: number; works: Work[] }>({
    queryKey: ["work", sortedBy, sortDirection, pageSize, currentPage],
    queryFn: () => {
      return fetchWorks(
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

  if (errorWork) {
    console.error("error");
    console.error(errorWork);

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
            There was an error fetching data...
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

            <WorkTable
              works={isFetchingWork || !data ? [] : data.works}
              setSortedBy={setSortedBy}
              setSortDirection={setSortDirection}
              sortDirection={sortDirection}
              sortedBy={sortedBy}
              isLoading={
                isLoadingWork || isErrorWork || isFetchingWork || isPendingWork
              }
            />

            <Divider />

            <CustomPagination
              count={isFetchingWork || !data ? 0 : data.count}
            />
          </Card>
        </Grow>
      </Box>
    </React.Fragment>
  );
}
