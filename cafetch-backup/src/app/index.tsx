import { Link } from 'expo-router';

import { Button } from '@/components/ui/button';
import { ScreenContainer } from '@/components/ui/screen-container';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <ThemedText type="title" themeColor="accent" accessibilityLabel="Coffee cup" style={styles.cup}>
        ☕
      </ThemedText>
      <ThemedText type="title">Cafetch</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        Discover your next favorite café.
      </ThemedText>
      <Link href="/explore" asChild>
        <Button label="Explore Cafés" style={styles.button} />
      </Link>
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
  button: {
    marginTop: 28,
  },
};
