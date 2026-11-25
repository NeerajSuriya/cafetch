import { Link } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CafeCard } from '@/components/cafe-card';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenContainer } from '@/components/ui/screen-container';
import { Surface } from '@/components/ui/surface';
import { mockCafes } from '@/data/mock-cafes';
import { useFavorites } from '@/hooks/use-favorites';

export default function SavedScreen() {
  const { hasLoaded, isFavorite } = useFavorites();
  const savedCafes = mockCafes.filter((cafe) => isFavorite(cafe.id));

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="small" themeColor="accent" style={styles.eyebrow}>
            YOUR COLLECTION
          </ThemedText>
          <ThemedText type="title">Saved cafés</ThemedText>
          <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
            Your favourite spots, ready when you are.
          </ThemedText>
        </View>

        {!hasLoaded ? (
          <View style={styles.centered}>
            <ThemedText type="default" themeColor="textSecondary">
              Loading saved cafés…
            </ThemedText>
          </View>
        ) : savedCafes.length > 0 ? (
          <View style={styles.cafeList}>
            {savedCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </View>
        ) : (
          <Surface style={styles.emptyState}>
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              No saved cafés yet
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.emptyCopy}>
              Save a place you love and it will appear here.
            </ThemedText>
            <Link href="/explore" asChild>
              <Button label="Discover cafés" />
            </Link>
          </Surface>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 30,
  },
  eyebrow: {
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 8,
  },
  cafeList: {
    gap: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 21,
    lineHeight: 28,
  },
  emptyCopy: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
});
