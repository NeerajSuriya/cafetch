import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Surface } from '@/components/ui/surface';
import { useTheme } from '@/hooks/use-theme';

const icons = {
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  clear: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

type CafeSearchBarProps =
  | { mode: 'launcher'; onPress: () => void }
  | {
      mode: 'input';
      value: string;
      onChangeText: (value: string) => void;
      onSubmit: () => void;
      onClear: () => void;
    };

export function CafeSearchBar(props: CafeSearchBarProps) {
  const theme = useTheme();

  return (
    <Surface style={styles.searchBar}>
      <SymbolView name={icons.search} size={20} tintColor={theme.textSecondary} />
      {props.mode === 'launcher' ? (
        <Pressable
          accessibilityLabel="Search cafés or an area"
          accessibilityRole="button"
          onPress={props.onPress}
          style={styles.field}>
          <ThemedText type="default" themeColor="textSecondary">
            Search cafés or an area...
          </ThemedText>
        </Pressable>
      ) : (
        <>
          <TextInput
            accessibilityLabel="Search cafés or an area"
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmit}
            placeholder="Search cafés or an area..."
            placeholderTextColor={theme.textSecondary}
            returnKeyType="search"
            selectionColor={theme.primary}
            style={[styles.input, { color: theme.text }]}
            value={props.value}
          />
          {props.value.length > 0 && (
            <Pressable
              accessibilityLabel="Clear search"
              accessibilityRole="button"
              hitSlop={8}
              onPress={props.onClear}
              style={styles.clearButton}>
              <SymbolView name={icons.clear} size={19} tintColor={theme.textSecondary} />
            </Pressable>
          )}
        </>
      )}
    </Surface>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    minHeight: 54,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  field: {
    flex: 1,
    minHeight: 52,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 52,
    fontSize: 15,
    paddingVertical: 0,
  },
  clearButton: {
    width: 30,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
