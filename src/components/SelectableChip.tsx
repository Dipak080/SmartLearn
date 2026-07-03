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
      <Animated.View style={[styles.chip, active && styles.chipActive, { transform: [{ scale: scaleAnim }] }]}>
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
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minHeight: 46,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  labelActive: {
    color: colors.white,
  },
  count: {
    marginLeft: 10,
    marginRight: -8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
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
