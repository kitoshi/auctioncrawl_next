'use client';

import { ScriptProps } from 'next/script';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ApiData, CrawlerAPIObject } from '../data/ApiData';

const GlobalContext = createContext<CrawlerAPIObject[] | undefined>([]);

export const GlobalContextProvider = ({ children }: ScriptProps) => {
  const apiData = useMemo(() => new ApiData(), []);
  const [data, setData] = useState<CrawlerAPIObject[]>();

  const fetchData = useCallback(async () => {
    await apiData.fetchData();
    setData(apiData.getData());
  }, [apiData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
