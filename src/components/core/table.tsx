import * as React from "react";
import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDown, ArrowsDownUp, ArrowUp } from "@phosphor-icons/react";

export interface Row {
  id: string;
  [key: string]: string | number;
}

export interface Column {
  field: string;
  headerName?: string;
  hideName?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
  isSortable?: boolean;
  formatter?: (row: Row, index: number) => React.ReactNode;
  name?: string;
}

export interface DataTableProps {
  columns: Column[];
  rows: Row[];
  selectable?: boolean;
  selected?: string[];
  hideHead?: boolean;
  hover?: boolean;
  blockLastColumn?: boolean;
  maxHeight?: string | number;
  minHeight?: string | number;
  isLoading?: boolean;
  sortedBy?: { ID: number; name: string };
  sortDirection?: "ASC" | "DESC";
  setSortedBy?: (sort: { ID: number; name: string }) => void;
  setSortDirection?: (dir: "ASC" | "DESC") => void;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: Row) => void;
  onSelectOne?: (event: React.ChangeEvent<HTMLInputElement>, row: Row) => void;
  onDeselectOne?: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: Row
  ) => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export function DataTable({
  columns,
  rows,
  selectable = false,
  selected = [],
  hideHead = false,
  hover = false,
  blockLastColumn = false,
  maxHeight,
  minHeight,
  isLoading = false,
  sortedBy,
  sortDirection,
  setSortedBy,
  setSortDirection,
  onClick,
  onSelectOne,
  onDeselectOne,
}: DataTableProps) {
  const handleSort = (fieldName: string, index: number) => {
    if (sortedBy?.ID === index) {
      setSortDirection?.(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortedBy?.({ ID: index, name: fieldName });
      setSortDirection?.("ASC");
    }
  };

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <TableContainer sx={{ maxHeight, minHeight }}>
      <Table stickyHeader>
        <TableHead
          sx={{
            ...(hideHead && {
              visibility: "collapse",
              "--TableCell-borderWidth": 0,
            }),
          }}
        >
          <TableRow>
            {selectable && <TableCell padding="checkbox">Sel.</TableCell>}

            {columns.map((column, index) => {
              const isLastColumn = index === columns.length - 1;

              return (
                <TableCell
                  key={column.name ?? column.field.toString()}
                  onClick={() =>
                    column.isSortable &&
                    handleSort(column.field.toString(), index)
                  }
                  sx={{
                    width: column.width,
                    minWidth: column.width,
                    maxWidth: column.width,
                    ...(column.align && { textAlign: column.align }),
                    cursor: column.isSortable ? "pointer" : "default",
                    ...(isLastColumn &&
                      blockLastColumn && {
                        position: "sticky",
                        right: 0,
                        backgroundColor: "background.paper",
                        zIndex: 2,
                      }),
                  }}
                >
                  {!column.hideName && column.headerName}
                  {column.isSortable && (
                    <IconButton size="small" sx={{ ml: 1 }}>
                      {sortedBy?.ID === index ? (
                        sortDirection === "ASC" ? (
                          <ArrowDown style={{ opacity: 0.5 }} />
                        ) : (
                          <ArrowUp style={{ opacity: 0.5 }} />
                        )
                      ) : (
                        <ArrowsDownUp style={{ opacity: 0.5 }} />
                      )}
                    </IconButton>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody sx={{ overflowY: "auto" }}>
          {!isLoading && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Nessun elemento trovato
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {isLoading && (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Caricamento in corso...
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            rows.map((row: Row, rowIndex) => {
              const rowSelected = (selected ?? []).includes(row.id);

              return (
                <TableRow
                  key={row.id ?? rowIndex}
                  hover={hover}
                  selected={rowSelected}
                  {...(onClick && {
                    onClick: (event: React.MouseEvent<HTMLTableRowElement>) =>
                      onClick(event, row),
                  })}
                  sx={{ ...(onClick && { cursor: "pointer" }) }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={rowSelected}
                        onChange={(event) =>
                          rowSelected
                            ? onDeselectOne?.(event, row)
                            : onSelectOne?.(event, row)
                        }
                        onClick={(event) => event.stopPropagation()}
                      />
                    </TableCell>
                  )}

                  {columns.map((column, colIndex) => {
                    const isLastColumn = colIndex === columns.length - 1;
                    const value = column.field ? row[column.field] : null;

                    return (
                      <TableCell
                        key={column.name ?? column.field.toString()}
                        sx={{
                          ...(column.align && { textAlign: column.align }),
                          ...(isLastColumn &&
                            blockLastColumn && {
                              position: "sticky",
                              right: 0,
                              backgroundColor: "background.paper",
                              zIndex: 1,
                            }),
                        }}
                      >
                        {column.formatter ? (
                          column.formatter(row, colIndex)
                        ) : typeof value === "string" ? (
                          <Typography variant="body2">
                            {capitalizeWords(value)}
                          </Typography>
                        ) : (
                          <Typography variant="body2">{value}</Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
