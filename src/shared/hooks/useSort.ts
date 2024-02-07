import { useEffect, useState } from 'react';

const sortMap = new Map<string | object, object>();

export interface ISort<T> {
  setSort: (key: keyof T, value: any) => void;
  resetSort: () => void;
  sort: T;
}

export interface ConfigProps {
  key?: string;
}

export function useSort<T extends object>(sort: T, config?: ConfigProps): ISort<T> {
  const data = sortMap.get(config?.key || sort) as T;

  const [sortState, setSortState] = useState<T>(data ?? sort);

  /**
   * This will set the sort values in state
   * @param key based on key of your object
   * @param value
   */
  function setSort(key: keyof T, value: any) {
    setSortState((current) => ({ ...current, [key as string]: value }));
  }

  /**
   * This will reset the state values to default
   */
  const resetSort = () => {
    setSortState(sort);
  };

  /**
   *  if un-mounted. the state object will save to map
   */
  useEffect(
    () => () => {
      sortMap.set(config?.key || sort, sortState);
    },
    [config?.key, sort, sortState]
  );

  return {
    setSort,
    resetSort,
    sort: sortState
  };
}
