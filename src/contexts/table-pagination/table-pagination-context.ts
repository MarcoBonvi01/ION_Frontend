import * as React from "react";

interface TablePaginationContextValue {
  from: number;
  setFrom: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  initialPageSize: number;
}

export const TablePaginationContext =
  React.createContext<TablePaginationContextValue>({
    from: 0,
    setFrom: () => {},
    currentPage: 0,
    setCurrentPage: () => {},
    pageSize: 10,
    setPageSize: () => {},
    initialPageSize: 10,
  });
