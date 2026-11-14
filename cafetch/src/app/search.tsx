import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CafeCard } from '@/components/cafe-card';
import { CafeSearchBar } from '@/components/cafe-search-bar';
import { ThemedText } from '@/components/themed-text';
import { ScreenContainer } from '@/components/ui/screen-container';
import { mockCafes } from '@/data/mock-cafes';
import { useCafeFilters } from '@/hooks/use-cafe-filters';
import { useTheme } from '@/hooks/use-theme';
import { countActiveCafeFilters, filterCafes } from '@/utils/cafe-filters';

const emptySearchIcon = {
  ios: 'magnifyingglass',
  android: 'search',
  web: 'search',
} as const satisfies ComponentProps<typeof SymbolView>['name'];

export default function SearchScreen() {
  const theme = useTheme();
  const { filters } = useCafeFilters();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const activeFilterCount = countActiveCafeFilters(filters);
  const results = filterCafes(mockCafes, filters, query);

  const clearSearch = () => setQuery('');
  const submitSearch = () => setQuery((currentQuery) => currentQuery.trim());

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <ThemedText type="small" themeColor="accent" style={styles.eyebrow}>
          DISCOVER  /  SEARCH
        </ThemedText>
        <ThemedText type="title" style={styles.heading}>
          Find your coffee spot.
        </ThemedText>
        <CafeSearchBar
          mode="input"
          value={query}
          onChangeText={setQuery}
          onSubmit={submitSearch}
          onClear={clearSearch}
        />

        <View style={styles.resultsHeader}>
          <ThemedText type="subtitle" style={styles.resultsTitle}>
            {normalizedQuery || activeFilterCount > 0 ? 'Matching cafés' : 'Cafés to Explore'}
          </ThemedText>
          {normalizedQuery ? (
            <ThemedText type="small" themeColor="textSecondary">
              {results.length} {results.length === 1 ? 'café' : 'cafés'} for “{query.trim()}”
              {activeFilterCount > 0
                ? ` · ${activeFilterCount} active ${activeFilterCount === 1 ? 'filter' : 'filters'}`
                : ''}
            </ThemedText>
          ) : activeFilterCount > 0 ? (
            <ThemedText type="small" themeColor="textSecondary">
              {results.length} {results.length === 1 ? 'café' : 'cafés'} · {activeFilterCount} active{' '}
              {activeFilterCount === 1 ? 'filter' : 'filters'}
            </ThemedText>
          ) : (
            <ThemedText type="small" themeColor="textSecondary">
              Browse all of our Chennai picks.
            </ThemedText>
          )}
        </View>

        {results.length > 0 ? (
          <View style={styles.cafeList}>
            {results.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </View>
        ) : (
          <View style={[styles.emptyState, { borderColor: theme.border }]}>
            <View style={[styles.emptyIcon, { backgroundColor: theme.backgroundSelected }]}>
              <SymbolView name={emptySearchIcon} size={24} tintColor={theme.accent} />
            </View>
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              No cafés found
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.emptyCopy}>
              Try another café name or area, or adjust active filters.
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  eyebrow: {
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 20,
  },
  resultsHeader: {
    marginTop: 28,
    marginBottom: 14,
    gap: 3,
  },
  resultsTitle: {
    fontSize: 23,
    lineHeight: 30,
  },
  cafeList: {
    gap: 14,
  },
  emptyState: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 21,
    lineHeight: 28,
  },
  emptyCopy: {
    marginTop: 6,
    textAlign: 'center',
  },
});
