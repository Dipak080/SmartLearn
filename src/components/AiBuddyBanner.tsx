import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { fonts, radius, spacing, useAppTheme, type AppColors } from '../theme';

const SPARKLE_BIG =
  'M41.8867 0.0788637C41.9256 -0.0262883 42.0744 -0.0262877 42.1133 0.0788643L43.1225 2.80617C43.1347 2.83923 43.1608 2.8653 43.1938 2.87753L45.9211 3.88673C46.0263 3.92564 46.0263 4.07436 45.9211 4.11327L43.1938 5.12247C43.1608 5.1347 43.1347 5.16077 43.1225 5.19383L42.1133 7.92114C42.0744 8.02629 41.9256 8.02629 41.8867 7.92114L40.8775 5.19383C40.8653 5.16077 40.8392 5.1347 40.8062 5.12247L38.0789 4.11327C37.9737 4.07436 37.9737 3.92564 38.0789 3.88673L40.8062 2.87753C40.8392 2.8653 40.8653 2.83923 40.8775 2.80617L41.8867 0.0788637Z';
const SPARKLE_SMALL =
  'M2.37059 42.0901C2.41505 41.97 2.58495 41.97 2.62941 42.0901L3.22333 43.6951C3.2373 43.7329 3.26708 43.7627 3.30485 43.7767L4.9099 44.3706C5.03003 44.415 5.03003 44.585 4.9099 44.6294L3.30485 45.2233C3.26708 45.2373 3.23731 45.2671 3.22333 45.3049L2.62941 46.9099C2.58495 47.03 2.41505 47.03 2.37059 46.9099L1.77667 45.3049C1.7627 45.2671 1.73292 45.2373 1.69515 45.2233L0.0900965 44.6294C-0.0300321 44.585 -0.0300322 44.415 0.0900965 44.3706L1.69515 43.7767C1.73292 43.7627 1.7627 43.7329 1.77667 43.6951L2.37059 42.0901Z';

interface AiBuddyBannerProps {
  style?: StyleProp<ViewStyle>;
  translucent?: boolean;
}

export default function AiBuddyBanner({ style, translucent = false }: AiBuddyBannerProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <View style={[styles.wrap, translucent && styles.wrapTranslucent, style]}>
      <View style={styles.avatar}>
        <Svg width={42} height={42} viewBox="0 0 46 47" style={StyleSheet.absoluteFill}>
          <Rect x={8} y={12} width={34} height={34} rx={17} fill="#3C425F" />
          <Path d={SPARKLE_BIG} fill="#474D67" />
          <Path d={SPARKLE_SMALL} fill="#474D67" />
        </Svg>
        <Image
          source={require('../assets/robothome.png')}
          style={styles.avatarImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.label}>Your A.i buddy</Text>
        <Text style={styles.title} numberOfLines={1}>
          You're learning great today!
        </Text>
      </View>
    </View>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  wrapTranslucent: {
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: spacing.md,
  },
  avatarImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 42,
    height: 42,
  },
  textCol: {
    flex: 1,
    marginLeft: -10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fonts.regular,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.interMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.15,
    marginTop: 2,
  },
});
