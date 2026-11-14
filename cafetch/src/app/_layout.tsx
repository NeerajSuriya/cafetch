import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { Colors } from '@/constants/theme';
import { CafeFiltersProvider } from '@/hooks/use-cafe-filters';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const routerTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={{ ...routerTheme, colors: { ...routerTheme.colors, background: theme.background } }}>
      <CafeFiltersProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <AppTabs />
      </CafeFiltersProvider>
    </ThemeProvider>
  );
}
