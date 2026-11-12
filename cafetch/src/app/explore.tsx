import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.cup} accessibilityLabel="Coffee cup">
        ☕
      </Text>
      <Text style={styles.title}>Discover Cafés</Text>
      <Text style={styles.subtitle}>Your next favorite café is waiting.</Text>
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
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    color: '#4B2E20',
    fontSize: 16,
    textAlign: 'center',
  },
});
