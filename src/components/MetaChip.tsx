import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fonts, radius, useAppTheme, type AppColors } from '../theme';
import { BookOutlineIcon, ClockIcon } from './icons';

interface MetaChipProps {
  label: string;
  icon?: 'book' | 'clock';
  translucent?: boolean;
}

export default function MetaChip({ label, icon, translucent = false }: MetaChipProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  return (
    <View style={[styles.chip, translucent && styles.translucent]}>
      {icon === 'book' && <BookOutlineIcon size={14} color={colors.navy} />}
      {icon === 'clock' && <ClockIcon size={13} color={colors.navy} />}
      <Text style={styles.label}>{label}</Text>
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
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
  },
  translucent: {
    backgroundColor: colors.overlayLight,
  },
  label: {
    fontSize: 12,
    color: colors.navy,
    fontFamily: fonts.semiBold,
  },
});
