import { ScreenContainer } from '@/components/ui/screen-container';
import { ThemedText } from '@/components/themed-text';

export default function MapScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <ThemedText type="title">Café Map</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        Discover cafés around you.
      </ThemedText>
    </ScreenContainer>
  );
}

const styles = {
  content: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center' as const,
  },
};
