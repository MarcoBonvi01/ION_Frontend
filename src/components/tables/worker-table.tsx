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
        return (
          <Typography variant="subtitle1">{(row as WorkRow)._id}</Typography>
        );
      },
    },
    {
      name: "executed_at",
      field: "executed_at",
      headerName: "Executed At",
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
      name: "terminated_at",
      field: "terminated_at",
      headerName: "Terminated At",
      isSortable: true,
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {dayjs(row.terminated_at as Date).format("DD/MM/YYYY HH:mm")}
          </Typography>
        );
      },
    },
    {
      name: "elements_downloaded",
      field: "elements_downloaded",
      headerName: "Downloaded Elements",
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as WorkRow).elements_downloaded.toString()}
          </Typography>
        );
      },
    },
    {
      name: "elements_added",
      field: "elements_added",
      headerName: "Added Elements",
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as WorkRow).elements_added.toString()}
          </Typography>
        );
      },
    },
    {
      name: "elements_duplicated",
      field: "elements_duplicated",
      headerName: "Duplicated Elements",
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as WorkRow).elements_duplicated.toString()}
          </Typography>
        );
      },
    },
    {
      name: "elements_removed",
      field: "elements_removed",
      headerName: "Removed Elements",
      align: "center",
      formatter: (row: Row) => {
        return (
          <Typography variant="subtitle1">
            {(row as WorkRow).elements_removed.toString()}
          </Typography>
        );
      },
    },
    {
      name: "success",
      field: "success",
      headerName: "Success",
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
