import * as React from 'react';

export const TableFiltersContext = React.createContext();

export function TableFiltersProvider({ children }) {
  const [filter, setFilter] = React.useState({});

  return (
    <TableFiltersContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </TableFiltersContext.Provider>
  );
}

export const TableFiltersConsumer = TableFiltersContext.Consumer;
