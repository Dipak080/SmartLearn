import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fonts, radius, spacing, useAppTheme, type AppColors } from '../theme';
import { BookOutlineIcon, ClockIcon } from './icons';

interface MetaChipProps {
  label: string;
  icon?: 'book' | 'clock';
  translucent?: boolean;
}

export default function MetaChip({ label, icon, translucent = false }: MetaChipProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const contentColor = translucent ? '#073647' : '#1F4958';
  return (
    <View style={[styles.chip, translucent && styles.translucent]}>
      {icon === 'book' && <BookOutlineIcon size={16} color={contentColor} />}
      {icon === 'clock' && <ClockIcon size={16} color={contentColor} />}
      <Text style={[styles.label, translucent && styles.labelTranslucent]}>{label}</Text>
    </View>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.overlayLighter,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    marginRight: spacing.sm,
  },
  translucent: {
    backgroundColor: colors.metaLime,
  },
  label: {
    fontSize: 10,
    color: '#1F4958',
    fontFamily: fonts.semiBold,
    lineHeight: 10,
    letterSpacing: -0.11,
  },
  labelTranslucent: {
    color: '#073647',
  },
});
