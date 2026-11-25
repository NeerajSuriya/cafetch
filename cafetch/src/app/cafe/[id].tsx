import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { FavoriteButton } from '@/components/favorite-button';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { ScreenContainer } from '@/components/ui/screen-container';
import { Surface } from '@/components/ui/surface';
import { mockCafes } from '@/data/mock-cafes';
import { useTheme } from '@/hooks/use-theme';
import { isCafeOpenNow } from '@/utils/cafe-filters';

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  coffee: { ios: 'cup.and.saucer.fill', android: 'coffee', web: 'coffee' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  distance: { ios: 'location.fill', android: 'location_on', web: 'location_on' },
  parking: { ios: 'parkingsign.circle.fill', android: 'local_parking', web: 'local_parking' },
  clock: { ios: 'clock.fill', android: 'schedule', web: 'schedule' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

export default function CafeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const cafeId = Array.isArray(id) ? id[0] : id;
  const cafe = mockCafes.find((item) => item.id === cafeId);
  const theme = useTheme();
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/explore');
    }
  };

  if (!cafe) {
    return (
      <ScreenContainer contentStyle={styles.centeredContent}>
        <ThemedText type="subtitle">Café not found</ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.notFoundCopy}>
          This café may no longer be in our list.
        </ThemedText>
        <Button label="Browse cafés" onPress={() => router.replace('/explore')} style={styles.notFoundButton} />
      </ScreenContainer>
    );
  }

  const isOpen = isCafeOpenNow(cafe);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${cafe.name}, ${cafe.area}, Chennai`
  )}`;

  const openDirections = async () => {
    try {
      await Linking.openURL(directionsUrl);
    } catch {
      Alert.alert('Directions unavailable', 'Please try again in a moment.');
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            { backgroundColor: theme.surface, borderColor: theme.border },
            pressed && styles.pressed,
          ]}>
          <SymbolView name={icons.back} size={20} tintColor={theme.text} />
          <ThemedText type="small">Back</ThemedText>
        </Pressable>

        <Surface style={styles.hero}>
          <View style={[styles.heroArtwork, { backgroundColor: theme.backgroundSelected }]}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
              CAFETCH PICK  /  {cafe.area.toUpperCase()}
            </ThemedText>
            <ThemedText type="title" style={styles.heroCaption}>
              {cafe.imagePlaceholder}
            </ThemedText>
            <SymbolView name={icons.coffee} size={64} tintColor={theme.accent} />
            <FavoriteButton cafe={cafe} style={styles.favoriteButton} />
          </View>

          <View style={styles.heroDetails}>
            <View style={styles.titleRow}>
              <View style={styles.titleBlock}>
                <ThemedText type="title" style={styles.name}>
                  {cafe.name}
                </ThemedText>
                <ThemedText type="default" themeColor="textSecondary">
                  {cafe.area}, Chennai
                </ThemedText>
              </View>
              <View style={[styles.status, { backgroundColor: isOpen ? theme.backgroundSelected : theme.surface, borderColor: theme.border }]}>
                <View style={[styles.statusDot, { backgroundColor: isOpen ? theme.accent : theme.textSecondary }]} />
                <ThemedText type="small">{isOpen ? 'Open now' : 'Closed'}</ThemedText>
              </View>
            </View>

            <View style={[styles.stats, { borderColor: theme.border }]}>
              <DetailStat icon={icons.star} label="Rating" value={cafe.rating.toFixed(1)} themeColor={theme.accent} />
              <DetailStat icon={icons.coffee} label="Price" value={'₹'.repeat(cafe.priceLevel)} themeColor={theme.accent} />
              <DetailStat icon={icons.distance} label="Distance" value={`${cafe.distanceKm.toFixed(1)} km`} themeColor={theme.accent} />
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              Based on {cafe.reviewCount} reviews
            </ThemedText>
          </View>
        </Surface>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            The vibe
          </ThemedText>
          <View style={styles.tags}>
            {cafe.tags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="small">{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <Surface style={styles.infoCard}>
          <InfoRow
            icon={icons.parking}
            title="Parking"
            detail={cafe.parkingAvailable ? 'Parking available nearby' : 'No dedicated parking'}
            iconColor={theme.accent}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <InfoRow
            icon={icons.clock}
            title="Opening hours"
            detail={`Daily · ${cafe.openingHours.opensAt}–${cafe.openingHours.closesAt}`}
            iconColor={theme.accent}
          />
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <InfoRow
            icon={icons.distance}
            title="Location"
            detail={`${cafe.area}, Chennai`}
            iconColor={theme.accent}
          />
        </Surface>

        <Button label="Get directions" onPress={() => void openDirections()} style={styles.directionsButton} />
      </ScrollView>
    </ScreenContainer>
  );
}

type DetailStatProps = {
  icon: ComponentProps<typeof SymbolView>['name'];
  label: string;
  value: string;
  themeColor: string;
};

function DetailStat({ icon, label, value, themeColor }: DetailStatProps) {
  return (
    <View style={styles.stat}>
      <SymbolView name={icon} size={18} tintColor={themeColor} />
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="small" style={styles.statValue}>
        {value}
      </ThemedText>
    </View>
  );
}

type InfoRowProps = {
  icon: ComponentProps<typeof SymbolView>['name'];
  title: string;
  detail: string;
  iconColor: string;
};

function InfoRow({ icon, title, detail, iconColor }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <SymbolView name={icon} size={20} tintColor={iconColor} />
      </View>
      <View style={styles.infoCopy}>
        <ThemedText type="small">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {detail}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundCopy: {
    marginTop: 8,
    textAlign: 'center',
  },
  notFoundButton: {
    marginTop: 24,
  },
  content: {
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  pressed: {
    opacity: 0.75,
  },
  hero: {
    overflow: 'hidden',
  },
  heroArtwork: {
    minHeight: 210,
    padding: 24,
    justifyContent: 'space-between',
  },
  favoriteButton: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.1,
  },
  heroCaption: {
    maxWidth: 290,
    fontSize: 30,
    lineHeight: 36,
  },
  heroDetails: {
    padding: 20,
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 30,
    lineHeight: 36,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    fontWeight: '700',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 23,
    lineHeight: 30,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  infoCard: {
    marginTop: 28,
    paddingHorizontal: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
  },
  infoIcon: {
    width: 28,
    alignItems: 'center',
  },
  infoCopy: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: 1,
  },
  directionsButton: {
    marginTop: 20,
  },
});
