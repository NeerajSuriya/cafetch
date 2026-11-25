import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';

const FAVORITES_STORAGE_KEY = 'cafetch.favorite-ids';

type FavoritesContextValue = {
  hasLoaded: boolean;
  isFavorite: (cafeId: string) => boolean;
  toggleFavorite: (cafeId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasHydratedRef = useRef(false);
  const pendingToggleIdsRef = useRef(new Set<string>());
  const writeQueueRef = useRef(Promise.resolve());

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      let storedFavoriteIds = new Set<string>();

      try {
        const storedValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        const parsedFavoriteIds: unknown = storedValue ? JSON.parse(storedValue) : [];

        if (Array.isArray(parsedFavoriteIds) && parsedFavoriteIds.every((id) => typeof id === 'string')) {
          storedFavoriteIds = new Set(parsedFavoriteIds);
        }
      } catch {}

      if (!isMounted) {
        return;
      }

      const resolvedFavoriteIds = new Set(storedFavoriteIds);

      for (const cafeId of pendingToggleIdsRef.current) {
        if (resolvedFavoriteIds.has(cafeId)) {
          resolvedFavoriteIds.delete(cafeId);
        } else {
          resolvedFavoriteIds.add(cafeId);
        }
      }

      pendingToggleIdsRef.current.clear();
      hasHydratedRef.current = true;
      setFavoriteIds(resolvedFavoriteIds);
      setHasLoaded(true);
    };

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      const serializedFavoriteIds = JSON.stringify([...favoriteIds]);
      writeQueueRef.current = writeQueueRef.current
        .catch(() => {})
        .then(() => AsyncStorage.setItem(FAVORITES_STORAGE_KEY, serializedFavoriteIds))
        .catch(() => {});
    }
  }, [favoriteIds, hasLoaded]);

  const toggleFavorite = useCallback((cafeId: string) => {
    if (!hasHydratedRef.current) {
      const pendingToggleIds = pendingToggleIdsRef.current;

      if (pendingToggleIds.has(cafeId)) {
        pendingToggleIds.delete(cafeId);
      } else {
        pendingToggleIds.add(cafeId);
      }
    }

    setFavoriteIds((currentFavoriteIds) => {
      const nextFavoriteIds = new Set(currentFavoriteIds);

      if (nextFavoriteIds.has(cafeId)) {
        nextFavoriteIds.delete(cafeId);
      } else {
        nextFavoriteIds.add(cafeId);
      }

      return nextFavoriteIds;
    });
  }, []);

  const value = useMemo(
    () => ({
      hasLoaded,
      isFavorite: (cafeId: string) => favoriteIds.has(cafeId),
      toggleFavorite,
    }),
    [favoriteIds, hasLoaded, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
