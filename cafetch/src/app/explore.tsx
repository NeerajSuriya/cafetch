import { ScreenContainer } from '@/components/ui/screen-container';
import { ThemedText } from '@/components/themed-text';

export default function ExploreScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <ThemedText type="title" themeColor="accent" accessibilityLabel="Coffee cup" style={styles.cup}>
        ☕
      </ThemedText>
      <ThemedText type="title">Discover Cafés</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        Your next favorite café is waiting.
      </ThemedText>
    </ScreenContainer>
  );
}

const styles = {
  cup: {
    fontSize: 48,
    lineHeight: 56,
    marginBottom: 8,
  },
  content: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center' as const,
  },
};
