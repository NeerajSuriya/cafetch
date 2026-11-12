import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.cup} accessibilityLabel="Coffee cup">
        ☕
      </Text>
      <Text style={styles.title}>Cafetch</Text>
      <Text style={styles.subtitle}>Discover your next favorite café.</Text>
      <Link href="/explore" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonText}>Explore Cafés</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7F2E8',
  },
  cup: {
    marginBottom: 20,
    fontSize: 56,
  },
  title: {
    color: '#4B2E20',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 10,
    color: '#4B2E20',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 32,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#4B2E20',
  },
  buttonText: {
    color: '#F7F2E8',
    fontSize: 16,
    fontWeight: '600',
  },
});
