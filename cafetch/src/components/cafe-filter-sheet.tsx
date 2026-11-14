import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { createDefaultCafeFilters, countActiveCafeFilters } from '@/utils/cafe-filters';
import type { CafeFilters } from '@/utils/cafe-filters';

type CafeFilterSheetProps = {
  visible: boolean;
  filters: CafeFilters;
  setFilters: Dispatch<SetStateAction<CafeFilters>>;
  aestheticTags: string[];
  resultCount: number;
  onClose: () => void;
};

type ChoiceProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function Choice({ label, selected, onPress }: ChoiceProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.choice,
        { backgroundColor: selected ? theme.backgroundSelected : theme.surface, borderColor: theme.border },
      ]}>
      <ThemedText type="small" themeColor={selected ? 'text' : 'textSecondary'}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function FilterSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <View style={styles.choices}>{children}</View>
    </View>
  );
}

export function CafeFilterSheet({
  visible,
  filters,
  setFilters,
  aestheticTags,
  resultCount,
  onClose,
}: CafeFilterSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const activeFilterCount = countActiveCafeFilters(filters);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}>
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityLabel="Close filters"
          accessibilityRole="button"
          onPress={onClose}
          style={styles.backdrop}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}>
          <View style={[styles.handle, { backgroundColor: theme.border }]} />
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <ThemedText type="subtitle" style={styles.title}>
                Find your fit
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setFilters(createDefaultCafeFilters())}
              style={styles.clearButton}>
              <ThemedText type="small" themeColor="accent">
                Clear all
              </ThemedText>
            </Pressable>
          </View>

          <ScrollView
            style={styles.sheetScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <FilterSection title="Minimum rating">
              {[null, 4, 4.5, 4.7].map((rating) => (
                <Choice
                  key={rating ?? 'any-rating'}
                  label={rating === null ? 'Any' : `${rating.toFixed(1)}+`}
                  selected={filters.minRating === rating}
                  onPress={() => setFilters((current) => ({ ...current, minRating: rating }))}
                />
              ))}
            </FilterSection>

            <FilterSection title="Budget · maximum per person">
              {[
                { value: null, label: 'Any' },
                { value: 1, label: '₹' },
                { value: 2, label: '₹₹' },
                { value: 3, label: '₹₹₹' },
              ].map(({ value, label }) => (
                <Choice
                  key={label}
                  label={label}
                  selected={filters.maxPriceLevel === value}
                  onPress={() =>
                    setFilters((current) => ({
                      ...current,
                      maxPriceLevel: value as CafeFilters['maxPriceLevel'],
                    }))
                  }
                />
              ))}
            </FilterSection>

            <FilterSection title="Maximum distance">
              {[
                { value: null, label: 'Any' },
                { value: 1, label: '1 km' },
                { value: 2, label: '2 km' },
                { value: 3, label: '3 km' },
              ].map(({ value, label }) => (
                <Choice
                  key={label}
                  label={value === null ? label : `≤ ${label}`}
                  selected={filters.maxDistanceKm === value}
                  onPress={() => setFilters((current) => ({ ...current, maxDistanceKm: value }))}
                />
              ))}
            </FilterSection>

            <FilterSection title="Aesthetic & vibe">
              {aestheticTags.map((tag) => {
                const selected = filters.aestheticTags.includes(tag);
                return (
                  <Choice
                    key={tag}
                    label={tag}
                    selected={selected}
                    onPress={() =>
                      setFilters((current) => ({
                        ...current,
                        aestheticTags: selected
                          ? current.aestheticTags.filter((currentTag) => currentTag !== tag)
                          : [...current.aestheticTags, tag],
                      }))
                    }
                  />
                );
              })}
            </FilterSection>

            <FilterSection title="Parking">
              <Choice
                label="Any"
                selected={!filters.parkingOnly}
                onPress={() => setFilters((current) => ({ ...current, parkingOnly: false }))}
              />
              <Choice
                label="Parking available"
                selected={filters.parkingOnly}
                onPress={() => setFilters((current) => ({ ...current, parkingOnly: true }))}
              />
            </FilterSection>

            <FilterSection title="Opening hours">
              <Choice
                label="Any time"
                selected={!filters.openNow}
                onPress={() => setFilters((current) => ({ ...current, openNow: false }))}
              />
              <Choice
                label="Open now"
                selected={filters.openNow}
                onPress={() => setFilters((current) => ({ ...current, openNow: true }))}
              />
            </FilterSection>

            <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
              Parking and opening hours are illustrative mock values, not verified café details.
            </ThemedText>
          </ScrollView>

          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={[styles.showButton, { backgroundColor: theme.primary }]}>
            <ThemedText type="small" themeColor="textOnPrimary" style={styles.showButtonText}>
              Show {resultCount} {resultCount === 1 ? 'café' : 'cafés'}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 14, 10, 0.42)',
  },
  sheet: {
    maxHeight: '92%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    alignSelf: 'center',
    width: 38,
    height: 4,
    borderRadius: 2,
    marginBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerCopy: {
    gap: 2,
  },
  title: {
    fontSize: 23,
    lineHeight: 29,
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sheetScroll: {
    flexShrink: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 8,
  },
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choice: {
    minHeight: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  disclaimer: {
    marginTop: 20,
    lineHeight: 20,
  },
  showButtonText: {
    fontSize: 16,
  },
  showButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginTop: 8,
  },
});
