import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationContext } from "../../contexts/table-pagination/table-pagination-context";

export const CustomPagination: React.FC<{ count: number }> = ({ count }) => {
  const { setFrom, currentPage, setCurrentPage, setPageSize, pageSize } =
    React.useContext(TablePaginationContext);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    if (currentPage < newPage) {
      setFrom((prev: number) => prev + pageSize);
    } else {
      setFrom((prev: number) => prev - pageSize);
    }

    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={handleChangePage}
      page={currentPage}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelDisplayedRows={({ from, to, count }) => {
        return `From ${from} to ${to} of ${
          count !== -1 ? count : `more than ${to}`
        }`;
      }}
      labelRowsPerPage={"Rows per page"}
      showFirstButton={true}
      showLastButton={true}
    />
  );
};
