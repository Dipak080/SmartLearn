import React from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet, ViewStyle, StyleProp, Animated } from 'react-native';

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
      <Animated.View style={[styles.btn, isCard && styles.btnCard, style, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.circle, isCard && styles.circleCard]}>
          <PlayIcon size={isCard ? 14 : 12} color={isCard ? colors.navy : colors.white} />
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
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    paddingVertical: 6,
  },
  circleCard: {
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
