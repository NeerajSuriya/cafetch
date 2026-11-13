import { Link, usePathname } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { Surface } from '@/components/ui/surface';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type TabIcon = 'discover' | 'saved' | 'map' | 'profile';
type TabItem = {
  href: '/explore' | '/saved' | '/map' | '/profile';
  label: string;
  icon: TabIcon;
};

const tabs: TabItem[] = [
  { href: '/explore', label: 'Discover', icon: 'discover' },
  { href: '/saved', label: 'Saved', icon: 'saved' },
  { href: '/map', label: 'Map', icon: 'map' },
  { href: '/profile', label: 'Profile', icon: 'profile' },
];

const icons = {
  discover: { ios: 'sparkles', android: 'explore', web: 'explore' },
  saved: { ios: 'bookmark', android: 'bookmark', web: 'bookmark' },
  map: { ios: 'map', android: 'map', web: 'map' },
  profile: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
} as const satisfies Record<TabIcon, ComponentProps<typeof SymbolView>['name']>;

export default function AppTabs() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.tabListContainer, { bottom: insets.bottom + Spacing.three }]}>
      <Surface style={styles.tabSurface}>
        <View style={styles.tabItems}>
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href || (tab.icon === 'discover' && pathname === '/');
            const color = isActive ? theme.tabActiveIcon : theme.tabInactive;

            return (
              <Link key={tab.href} href={tab.href} asChild>
                <Pressable
                  accessibilityLabel={tab.label}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  style={({ pressed }) => [
                    styles.tabButton,
                    isActive && { backgroundColor: theme.tabActiveBackground },
                    pressed && styles.pressed,
                  ]}>
                  <SymbolView name={icons[tab.icon]} size={20} tintColor={color} />
                  <ThemedText
                    type="small"
                    themeColor={isActive ? 'tabActiveLabel' : 'tabInactive'}>
                    {tab.label}
                  </ThemedText>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </Surface>
    </View>
  );
}


const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
  },
  tabSurface: {
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.one,
  },
  tabItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    borderRadius: Spacing.three,
  },
  pressed: {
    opacity: 0.75,
  },
});
