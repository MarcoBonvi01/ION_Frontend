import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataTable, type Column, type Row } from "../core/table";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import type { Work } from "../../interfaces/works";

interface WorkTableProps {
  works: Work[];
  sortDirection: "ASC" | "DESC";
  setSortDirection: (dir: "ASC" | "DESC") => void;
  sortedBy: { ID: number; name: string };
  setSortedBy: (sort: { ID: number; name: string }) => void;
  isLoading: boolean;
}

type WorkRow = Work & Row;

export const WorkTable: React.FC<WorkTableProps> = ({
  works,
  sortDirection,
  setSortDirection,
  sortedBy,
  setSortedBy,
  isLoading,
}) => {
  const columns: Column[] = [
    {
      name: "Identifier",
      field: "id",
      headerName: "Identifier",
      align: "center",
      formatter: (row: Row) => {
        return <Typography variant="subtitle1">{row.id}</Typography>;
      },
    },
    {
      name: "Work",
      field: "executed_at",
      headerName: "Date",
      isSortable: true,
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {dayjs(row.executed_at as Date).format("DD/MM/YYYY HH:mm")}
          </Typography>
        );
      },
    },
    {
      name: "Work",
      field: "success",
      headerName: "Status",
      formatter: (row: Row) => {
        return <Checkbox checked={row.success as boolean} />;
      },
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ overflowX: "auto" }}>
        <DataTable
          columns={columns}
          rows={works as WorkRow[]}
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
