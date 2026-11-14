import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Surface } from '@/components/ui/surface';
import { useTheme } from '@/hooks/use-theme';
import type { Cafe } from '@/data/mock-cafes';

const icons = {
  coffee: { ios: 'cup.and.saucer.fill', android: 'coffee', web: 'coffee' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

type CafeCardProps = {
  cafe: Cafe;
};

export function CafeCard({ cafe }: CafeCardProps) {
  const theme = useTheme();

  return (
    <Surface style={styles.card}>
      <View style={[styles.artwork, { backgroundColor: theme.backgroundSelected }]}>
        <View style={styles.artworkCopy}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
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

      <View style={styles.details}>
        <View style={styles.headingRow}>
          <View style={styles.nameBlock}>
            <ThemedText type="subtitle" style={styles.name}>
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
          {'₹'.repeat(cafe.priceLevel)}  ·  {cafe.distanceKm.toFixed(1)} km  ·  {cafe.reviewCount} reviews
        </ThemedText>

        <View style={styles.tags}>
          {cafe.tags.map((tag) => (
            <View key={tag} style={[styles.tag, { backgroundColor: theme.backgroundSelected }]}>
              <ThemedText type="small" themeColor="textSecondary">
                {tag}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  artwork: {
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
  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
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
  details: {
    padding: 16,
    gap: 10,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  tag: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
