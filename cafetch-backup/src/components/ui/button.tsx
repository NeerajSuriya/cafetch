import { forwardRef } from 'react';
import type { ElementRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  function Button({ label, variant = 'primary', style, accessibilityRole, ...props }, ref) {
    const theme = useTheme();
    const primary = variant === 'primary';

    return (
      <Pressable
        {...props}
        ref={ref}
        accessibilityRole={accessibilityRole ?? 'button'}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: primary ? theme.primary : theme.surface,
            borderColor: primary ? theme.primary : theme.border,
          },
          pressed && styles.pressed,
          style,
        ]}>
        <Text style={[styles.label, { color: primary ? theme.textOnPrimary : theme.primary }]}>
          {label}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
});
