import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState, type ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CafeCard } from '@/components/cafe-card';
import { CafeFilterSheet } from '@/components/cafe-filter-sheet';
import { CafeSearchBar } from '@/components/cafe-search-bar';
import { ThemedText } from '@/components/themed-text';
import { ScreenContainer } from '@/components/ui/screen-container';
import { Surface } from '@/components/ui/surface';
import { mockCafes } from '@/data/mock-cafes';
import { useCafeFilters } from '@/hooks/use-cafe-filters';
import { useTheme } from '@/hooks/use-theme';
import { countActiveCafeFilters, filterCafes } from '@/utils/cafe-filters';

const icons = {
  arrow: { ios: 'arrow.up.right', android: 'north_east', web: 'north_east' },
  cozy: { ios: 'sparkles', android: 'weekend', web: 'weekend' },
  work: { ios: 'laptopcomputer', android: 'laptop_mac', web: 'laptop_mac' },
  aesthetic: { ios: 'camera.macro', android: 'photo_camera', web: 'photo_camera' },
  outdoor: { ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

const quickFilters = ['Rating', 'Budget', 'Distance', 'Aesthetic', 'Parking', 'Open now'];
const popularAreas = ['Anna Nagar', 'Adyar', 'Nungambakkam', 'Besant Nagar'];
const collections = [
  { title: 'Cozy', detail: 'Slow down a little', icon: icons.cozy },
  { title: 'Work-friendly', detail: 'Settle in and focus', icon: icons.work },
  { title: 'Aesthetic', detail: 'Lovely from every angle', icon: icons.aesthetic },
  { title: 'Outdoor', detail: 'Coffee in the open air', icon: icons.outdoor },
];

export default function ExploreScreen() {
  const theme = useTheme();
  const { filters, setFilters } = useCafeFilters();
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);
  const activeFilterCount = countActiveCafeFilters(filters);
  const filteredCafes = filterCafes(mockCafes, filters);
  const aestheticTags = [...new Set(mockCafes.flatMap((cafe) => cafe.tags))].sort();

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="accent" style={styles.eyebrow}>
            CAFETCH  /  CHENNAI
          </ThemedText>
          <ThemedText type="title" style={styles.heading}>
            Find your coffee spot.
          </ThemedText>
          <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
            Discover cafés worth exploring.
          </ThemedText>
        </View>

        <CafeSearchBar mode="launcher" onPress={() => router.push('/search')} />

        <View style={styles.filterHeading}>
          <ThemedText type="small" themeColor="textSecondary">
            FILTER CAFÉS
          </ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => setFilterSheetVisible(true)}
            style={styles.activeFilterButton}>
            <ThemedText type="small" themeColor="accent">
              {activeFilterCount} active
            </ThemedText>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}>
          <Pressable
            accessibilityLabel={`Open filters, ${activeFilterCount} active`}
            accessibilityRole="button"
            onPress={() => setFilterSheetVisible(true)}
            style={[
              styles.filterChip,
              { backgroundColor: theme.backgroundSelected, borderColor: theme.accent },
            ]}>
            <ThemedText type="small">Filters · {activeFilterCount}</ThemedText>
          </Pressable>
          {quickFilters.map((filter) => {
            const selected =
              (filter === 'Rating' && filters.minRating !== null) ||
              (filter === 'Budget' && filters.maxPriceLevel !== null) ||
              (filter === 'Distance' && filters.maxDistanceKm !== null) ||
              (filter === 'Aesthetic' && filters.aestheticTags.length > 0) ||
              (filter === 'Parking' && filters.parkingOnly) ||
              (filter === 'Open now' && filters.openNow);
            const value =
              filter === 'Rating' && filters.minRating !== null
                ? ` ${filters.minRating.toFixed(1)}+`
                : filter === 'Budget' && filters.maxPriceLevel !== null
                  ? ` ${'₹'.repeat(filters.maxPriceLevel)} max`
                  : filter === 'Distance' && filters.maxDistanceKm !== null
                    ? ` ≤${filters.maxDistanceKm} km`
                    : filter === 'Aesthetic' && filters.aestheticTags.length > 0
                      ? ` ${filters.aestheticTags.length}`
                      : '';

            return (
              <Pressable
                key={filter}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setFilterSheetVisible(true)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: selected ? theme.backgroundSelected : theme.surface,
                    borderColor: selected ? theme.accent : theme.border,
                  },
                ]}>
                <ThemedText type="small" themeColor={selected ? 'text' : 'textSecondary'}>
                  {filter}{value}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Popular Areas
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {popularAreas.map((area, index) => (
              <Surface key={area} style={styles.areaCard}>
                <View style={styles.cardTopline}>
                  <ThemedText type="small" themeColor="accent" style={styles.cardEyebrow}>
                    0{index + 1}  /  CHENNAI
                  </ThemedText>
                  <SymbolView name={icons.arrow} size={16} tintColor={theme.textSecondary} />
                </View>
                <ThemedText type="subtitle" style={styles.areaName}>
                  {area}
                </ThemedText>
              </Surface>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Cafés to Explore
          </ThemedText>
          {filteredCafes.length > 0 ? (
            <View style={styles.cafeList}>
              {filteredCafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </View>
          ) : (
            <View style={[styles.noCafes, { borderColor: theme.border }]}>
              <ThemedText type="subtitle" style={styles.noCafesTitle}>
                No cafés match
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Try adjusting or clearing your filters.
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Explore by Mood
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}>
            {collections.map((collection) => (
              <Surface key={collection.title} style={styles.collectionCard}>
                <View style={[styles.collectionIcon, { backgroundColor: theme.backgroundSelected }]}>
                  <SymbolView name={collection.icon} size={22} tintColor={theme.accent} />
                </View>
                <ThemedText type="subtitle" style={styles.collectionTitle}>
                  {collection.title}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {collection.detail}
                </ThemedText>
              </Surface>
            ))}
          </ScrollView>
        </View>

        <View style={styles.scrollEnd} />
      </ScrollView>
      <CafeFilterSheet
        visible={filterSheetVisible}
        filters={filters}
        setFilters={setFilters}
        aestheticTags={aestheticTags}
        resultCount={filteredCafes.length}
        onClose={() => setFilterSheetVisible(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heading: {
    fontSize: 34,
    lineHeight: 40,
    maxWidth: 360,
  },
  subtitle: {
    marginTop: 8,
  },
  filterHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  activeFilterButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  filterList: {
    gap: 8,
    paddingTop: 6,
    paddingBottom: 2,
  },
  filterChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 23,
    lineHeight: 30,
    marginBottom: 14,
  },
  horizontalList: {
    gap: 12,
    paddingRight: 24,
  },
  areaCard: {
    width: 164,
    minHeight: 122,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
  },
  areaName: {
    fontSize: 19,
    lineHeight: 25,
  },
  cafeList: {
    gap: 14,
  },
  noCafes: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    gap: 6,
    alignItems: 'center',
  },
  noCafesTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  collectionCard: {
    width: 190,
    minHeight: 156,
    padding: 16,
    justifyContent: 'space-between',
  },
  collectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collectionTitle: {
    fontSize: 19,
    lineHeight: 25,
  },
  scrollEnd: {
    height: 8,
  },
});
