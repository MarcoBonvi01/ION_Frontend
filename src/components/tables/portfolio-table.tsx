import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataTable, type Column, type Row } from "../core/table";

import { IconButton } from "@mui/material";
import { Eye } from "@phosphor-icons/react";
import { CompanyModal } from "../dialogs/company-modal";
import type { Portfolio } from "../../interfaces/portfolio";
import type { Company } from "../../interfaces/company";

interface PortfolioTableProps {
  portfolio: Portfolio;
  sortDirection: "ASC" | "DESC";
  setSortDirection: (dir: "ASC" | "DESC") => void;
  sortedBy: { ID: number; name: string };
  setSortedBy: (sort: { ID: number; name: string }) => void;
  isLoading: boolean;
}

type CompanyRow = Company & Row;

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  portfolio,
  sortDirection,
  setSortDirection,
  sortedBy,
  setSortedBy,
  isLoading,
}) => {
  const [openMenu, setOpenMenu] = React.useState<{
    open: boolean;
    row?: CompanyRow;
  }>({
    open: false,
  });

  const columns: Column[] = [
    {
      name: "Company",
      field: "name",
      headerName: "Company",
      isSortable: true,
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as CompanyRow).name}
          </Typography>
        );
      },
    },
    {
      name: "Head Quarter City",
      field: "hq.city",
      headerName: "Head Quarter City",
      isSortable: true,
      formatter: (row: Row) => {
        const hq = (row as CompanyRow).hq;

        return hq.city ? (
          <Typography variant="subtitle1">{hq.city}</Typography>
        ) : (
          <Typography variant="subtitle1">N/A</Typography>
        );
      },
    },
    {
      name: "Head Quarter State",
      field: "hq.state",
      headerName: "Head Quarter State",
      isSortable: true,
      formatter: (row: Row) => {
        const hq = (row as CompanyRow).hq;

        return hq.state ? (
          <Typography variant="subtitle1">{hq.state}</Typography>
        ) : (
          <Typography variant="subtitle1">N/A</Typography>
        );
      },
    },
    {
      name: "Head Quarter Country",
      field: "hq.country",
      headerName: "Head Quarter Country",
      isSortable: true,
      formatter: (row: Row) => {
        const hq = (row as CompanyRow).hq;

        return hq.country ? (
          <Typography variant="subtitle1">{hq.country}</Typography>
        ) : (
          <Typography variant="subtitle1">N/A</Typography>
        );
      },
    },
    {
      name: "Year of Incorporation",
      field: "yoi",
      headerName: "Year of Incorporation",
      isSortable: true,
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">{(row as CompanyRow).yoi}</Typography>
        );
      },
    },
    {
      name: "Description",
      field: "description",
      headerName: "Description",
      isSortable: true,
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as CompanyRow).industry}
          </Typography>
        );
      },
    },
    {
      name: "actions",
      field: "actions",
      headerName: "Actions",
      align: "center",
      formatter: (row: Row) => {
        return (
          <IconButton
            onClick={() => setOpenMenu({ open: true, row: row as CompanyRow })}
          >
            <Eye />
          </IconButton>
        );
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

      {openMenu.open && (
        <CompanyModal
          handleClose={() => setOpenMenu({ open: false })}
          company={openMenu.row as CompanyRow}
        />
      )}
    </React.Fragment>
  );
};
