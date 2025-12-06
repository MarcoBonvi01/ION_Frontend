import * as React from "react";
import { TablePaginationContext } from "./table-pagination-context";

export const TablePaginationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialPageSize = 10;

  const [from, setFrom] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  return (
    <TablePaginationContext.Provider
      value={{
        from,
        setFrom,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        initialPageSize,
      }}
    >
      {children}
    </TablePaginationContext.Provider>
  );
};

export const TablePaginationConsumer = TablePaginationContext.Consumer;
