import { StyleSheet, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function Surface({ style, ...props }: ViewProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[styles.surface, { backgroundColor: theme.surface, borderColor: theme.border }, style]}
    />
  );
}

const styles = StyleSheet.create({
  surface: {
    borderWidth: 1,
    borderRadius: 20,
  },
});
