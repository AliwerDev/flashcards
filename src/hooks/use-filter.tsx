import { useState, useCallback } from "react";

type FilterState = Record<string, any>;

interface UseFilterReturn {
  value: FilterState;
  clearFilter: (name: string) => void;
  clearFilters: () => void;
  onFilter: (filters: FilterState) => void;
  changeFilter: (name: string, value: any) => void;
}

export function useFilter(defaultValue: FilterState = {}): UseFilterReturn {
  const [filter, setFilter] = useState<FilterState>(defaultValue);

  const clearFilters = useCallback(() => {
    setFilter({});
  }, []);

  const clearFilter = useCallback((name: string) => {
    setFilter((s) => {
      const newFilter = { ...s };
      delete newFilter[name];
      return newFilter;
    });
  }, []);

  const onFilter = useCallback((filters: FilterState) => {
    setFilter((s) => ({ ...s, ...filters }));
  }, []);

  const changeFilter = useCallback((name: string, value: any) => {
    setFilter((s) => ({ ...s, [name]: value }));
  }, []);

  return {
    value: filter,
    clearFilter,
    clearFilters,
    onFilter,
    changeFilter,
  };
}
