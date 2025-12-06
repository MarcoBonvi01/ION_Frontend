import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataTable, type Column, type Row } from "../core/table";
import type { Portfolio } from "../../pages/home/portfolio/portfolio-page";

interface PortfolioTableProps {
  portfolio: Portfolio;
  sortDirection: "ASC" | "DESC";
  setSortDirection: (dir: "ASC" | "DESC") => void;
  sortedBy: { ID: number; name: string };
  setSortedBy: (sort: { ID: number; name: string }) => void;
  isLoading: boolean;
}

interface CompanyRow extends Row {
  id: string;
  name: string;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  portfolio,
  sortDirection,
  setSortDirection,
  sortedBy,
  setSortedBy,
  isLoading,
}) => {
  const columns: Column[] = [
    {
      name: "Company",
      field: "name",
      headerName: "Company",
      isSortable: true,
      formatter: (row: Row) => {
        return <Typography variant="subtitle1">{row.name}</Typography>;
      },
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ overflowX: "auto" }}>
        <DataTable
          columns={columns}
          rows={portfolio.companies as CompanyRow[]}
          selectable={false}
          selected={[]}
          setSortDirection={setSortDirection}
          setSortedBy={setSortedBy}
          sortDirection={sortDirection}
          sortedBy={sortedBy}
          isLoading={isLoading}
          blockLastColumn={true}
        />
      </Box>
    </React.Fragment>
  );
};
