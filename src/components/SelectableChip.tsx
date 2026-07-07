import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';

import { fonts, radius, useAppTheme, type AppColors } from '../theme';

interface SelectableChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  count?: string;
  icon?: React.ReactNode;
}

export default function SelectableChip({ label, icon, active = false, count, onPress }: SelectableChipProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const animatedScale = { transform: [{ scale: scaleAnim }] };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
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
      <Animated.View style={[styles.chip, active && styles.chipActive, animatedScale]}>
        {icon !== undefined && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
        {count !== undefined && (
          <View style={[styles.count, active && styles.countActive]}>
            <Text style={[styles.countText, active && styles.countTextActive]}>{count}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 56,
    paddingVertical: 6,
    paddingHorizontal: 15,
    minHeight: 44,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.navyDeep,
    borderColor: colors.navyDeep,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    color: colors.navy,
    fontFamily: fonts.interMedium,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.13,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.white,
  },
  count: {
    marginLeft: 10,
    marginRight: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.chipCountBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  countActive: {
    backgroundColor: colors.white,
  },
  countText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fonts.bold,
  },
  countTextActive: {
    color: colors.navy,
  },
});
