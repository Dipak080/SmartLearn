import React from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet, ViewStyle, StyleProp, Animated } from 'react-native';
import { BlurView } from '@sbaiahmed1/react-native-blur';

import { fonts, radius, useAppTheme, type AppColors } from '../theme';
import { PlayIcon } from './icons';

interface PlayButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'light' | 'card';
  style?: StyleProp<ViewStyle>;
}

export default function PlayButton({ label, onPress, variant = 'light', style }: PlayButtonProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const isCard = variant === 'card';
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const animatedScale = { transform: [{ scale: scaleAnim }] };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.btn, isCard && styles.btnCard, style, animatedScale]}>
        {isCard && (
          <BlurView
            style={styles.blur}
            blurType="light"
            blurAmount={25}
            reducedTransparencyFallbackColor="white"
          />
        )}
        <Text style={[styles.label, isCard && styles.labelCard]}>{label}</Text>
        <View style={[styles.circle, isCard && styles.circleCard]}>
          <PlayIcon size={isCard ? 18 : 12} color={isCard ? colors.navy : colors.white} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingLeft: 14,
    paddingRight: 4,
    paddingVertical: 4,
  },
  label: {
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    marginRight: 6,
  },
  labelCard: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCard: {
    width: 256,
    height: 60,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 6,
    overflow: 'hidden',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.pill,
  },
  circleCard: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 39.5,
    padding: 9,
  },
});
