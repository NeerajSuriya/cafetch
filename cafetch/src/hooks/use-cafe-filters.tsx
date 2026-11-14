import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { createDefaultCafeFilters } from '@/utils/cafe-filters';
import type { CafeFilters } from '@/utils/cafe-filters';

type CafeFiltersContextValue = {
  filters: CafeFilters;
  setFilters: Dispatch<SetStateAction<CafeFilters>>;
};

const CafeFiltersContext = createContext<CafeFiltersContextValue | null>(null);

export function CafeFiltersProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState(createDefaultCafeFilters);
  const value = useMemo(() => ({ filters, setFilters }), [filters]);

  return <CafeFiltersContext.Provider value={value}>{children}</CafeFiltersContext.Provider>;
}

export function useCafeFilters() {
  const context = useContext(CafeFiltersContext);

  if (!context) {
    throw new Error('useCafeFilters must be used inside CafeFiltersProvider');
  }

  return context;
}
