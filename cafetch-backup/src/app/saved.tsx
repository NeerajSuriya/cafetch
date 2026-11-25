import { ScreenContainer } from '@/components/ui/screen-container';
import { ThemedText } from '@/components/themed-text';

export default function SavedScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <ThemedText type="title">Saved cafés</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        Cafés you save will appear here.
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
