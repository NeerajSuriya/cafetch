import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import type { Cafe } from '@/data/mock-cafes';
import { useFavorites } from '@/hooks/use-favorites';
import { useTheme } from '@/hooks/use-theme';

const icons = {
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  heartFilled: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

type FavoriteButtonProps = {
  cafe: Cafe;
  style?: StyleProp<ViewStyle>;
};

export function FavoriteButton({ cafe, style }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const favorited = isFavorite(cafe.id);

  return (
    <Pressable
      accessibilityLabel={`${favorited ? 'Remove' : 'Save'} ${cafe.name} ${favorited ? 'from' : 'to'} saved cafés`}
      accessibilityRole="button"
      accessibilityState={{ selected: favorited }}
      hitSlop={8}
      onPress={(event) => {
        event.stopPropagation();
        toggleFavorite(cafe.id);
      }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: favorited ? theme.backgroundSelected : theme.surface },
        pressed && styles.pressed,
        style,
      ]}>
      <SymbolView name={favorited ? icons.heartFilled : icons.heart} size={19} tintColor={theme.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
});
