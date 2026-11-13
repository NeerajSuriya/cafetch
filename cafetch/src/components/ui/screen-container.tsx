import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type SafeAreaViewProps } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenContainerProps = SafeAreaViewProps & {
  contentStyle?: StyleProp<ViewStyle>;
};

export function ScreenContainer({ children, contentStyle, style, ...props }: ScreenContainerProps) {
  const theme = useTheme();

  return (
    <SafeAreaView {...props} style={[styles.screen, { backgroundColor: theme.background }, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 88,
  },
});
