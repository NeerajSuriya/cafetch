import { ScreenContainer } from '@/components/ui/screen-container';
import { ThemedText } from '@/components/themed-text';

export default function ProfileScreen() {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        Your Cafetch profile will appear here.
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
