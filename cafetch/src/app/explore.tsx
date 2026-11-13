import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ScreenContainer } from '@/components/ui/screen-container';
import { Surface } from '@/components/ui/surface';
import { Spacing } from '@/constants/theme';
import { mockCafes } from '@/data/mock-cafes';
import { useTheme } from '@/hooks/use-theme';

const icons = {
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  coffee: { ios: 'cup.and.saucer.fill', android: 'coffee', web: 'coffee' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  arrow: { ios: 'arrow.up.right', android: 'north_east', web: 'north_east' },
  cozy: { ios: 'sparkles', android: 'weekend', web: 'weekend' },
  work: { ios: 'laptopcomputer', android: 'laptop_mac', web: 'laptop_mac' },
  aesthetic: { ios: 'camera.macro', android: 'photo_camera', web: 'photo_camera' },
  outdoor: { ios: 'sun.max.fill', android: 'wb_sunny', web: 'wb_sunny' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

const quickFilters = ['Rating', 'Budget', 'Distance', 'Aesthetic'];
const popularAreas = ['Anna Nagar', 'Adyar', 'Nungambakkam', 'Besant Nagar'];
const collections = [
  { title: 'Cozy', detail: 'Slow down a little', icon: icons.cozy },
  { title: 'Work-friendly', detail: 'Settle in and focus', icon: icons.work },
  { title: 'Aesthetic', detail: 'Lovely from every angle', icon: icons.aesthetic },
  { title: 'Outdoor', detail: 'Coffee in the open air', icon: icons.outdoor },
];

export default function ExploreScreen() {
  const theme = useTheme();

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

        <Surface style={styles.searchBar}>
          <SymbolView name={icons.search} size={20} tintColor={theme.textSecondary} />
          <TextInput
            accessibilityLabel="Search cafés or an area"
            placeholder="Search cafés or an area..."
            placeholderTextColor={theme.textSecondary}
            selectionColor={theme.primary}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </Surface>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}>
          {quickFilters.map((filter) => (
            <Pressable
              key={filter}
              accessibilityRole="button"
              style={[styles.filterChip, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <ThemedText type="small" themeColor="textSecondary">
                {filter}
              </ThemedText>
            </Pressable>
          ))}
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
          <View style={styles.cafeList}>
            {mockCafes.map((cafe) => (
              <Surface key={cafe.id} style={styles.cafeCard}>
                <View style={[styles.cafeArtwork, { backgroundColor: theme.backgroundSelected }]}>
                  <View style={styles.artworkCopy}>
                    <ThemedText type="small" themeColor="textSecondary" style={styles.cardEyebrow}>
                      A CAFETCH PICK
                    </ThemedText>
                    <ThemedText type="subtitle" themeColor="text" style={styles.artworkCaption}>
                      {cafe.imagePlaceholder}
                    </ThemedText>
                  </View>
                  <SymbolView name={icons.coffee} size={42} tintColor={theme.accent} />
                  <Pressable
                    accessibilityLabel={`Save ${cafe.name}`}
                    accessibilityRole="button"
                    style={[styles.favoriteButton, { backgroundColor: theme.surface }]}>
                    <SymbolView name={icons.heart} size={19} tintColor={theme.primary} />
                  </Pressable>
                </View>

                <View style={styles.cafeDetails}>
                  <View style={styles.cafeHeadingRow}>
                    <View style={styles.cafeNameBlock}>
                      <ThemedText type="subtitle" style={styles.cafeName}>
                        {cafe.name}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {cafe.area}
                      </ThemedText>
                    </View>
                    <View style={styles.rating}>
                      <SymbolView name={icons.star} size={15} tintColor={theme.accent} />
                      <ThemedText type="small" style={styles.ratingText}>
                        {cafe.rating.toFixed(1)}
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText type="small" themeColor="textSecondary" style={styles.meta}>
                    {'₹'.repeat(cafe.priceLevel)}  ·  {cafe.distance}  ·  {cafe.reviewCount} reviews
                  </ThemedText>

                  <View style={styles.tagList}>
                    {cafe.tags.map((tag) => (
                      <View
                        key={tag}
                        style={[styles.tag, { backgroundColor: theme.backgroundSelected }]}>
                        <ThemedText type="small" themeColor="textSecondary">
                          {tag}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              </Surface>
            ))}
          </View>
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

        <View style={{ height: Spacing.two }} />
      </ScrollView>
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
  searchBar: {
    minHeight: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    minHeight: 52,
    fontSize: 15,
    paddingVertical: 0,
  },
  filterList: {
    gap: 8,
    paddingTop: 14,
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
  cafeCard: {
    overflow: 'hidden',
  },
  cafeArtwork: {
    minHeight: 148,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  artworkCopy: {
    flex: 1,
    gap: 7,
  },
  artworkCaption: {
    fontSize: 20,
    lineHeight: 26,
    maxWidth: 250,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cafeDetails: {
    padding: 16,
    gap: 10,
  },
  cafeHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cafeNameBlock: {
    flex: 1,
  },
  cafeName: {
    fontSize: 20,
    lineHeight: 26,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontWeight: '700',
  },
  meta: {
    lineHeight: 20,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  tag: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
});
