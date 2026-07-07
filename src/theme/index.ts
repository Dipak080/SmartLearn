import { useColorScheme } from 'react-native';

export const lightColors = {
  navy: '#1B2A4A',
  navyDark: '#16233D',
  white: '#FFFFFF',
  screenBg: '#F7F8FA',

  // Accents
  pink: '#F26B8A',
  pinkSoft: '#F9D6DE',
  lime: '#DFF28A',
  limeSoft: '#E9F2A6',
  purple: '#C9B8F0',
  purpleSoft: '#EDE7FB',
  blue: '#4C8DFF',
  blueSoft: '#DCE9FF',
  cardBlue: '#C7DCF5',
  fire: '#F97316',
  fireSoft: '#FBBF24',

  // Text
  ink: '#010000',
  textPrimary: '#1B2A4A',
  textSecondary: '#8A93A6',
  textSlate: '#708892',
  textMuted: '#AAB2C2',
  navyDeep: '#1C274C',

  // Utility
  border: '#EDEFF3',
  chipBg: '#F1F3F7',
  green: '#7BC47F',
  greenSoft: '#DCEFD9',
  greenDeep: '#7AA83C',
  cream: '#F1EDDA',
  badgeGrey: '#9AA3B4',
  blueCard: '#EAF1FA',
  tickGrey: '#C9CFDA',
  overlayLight: 'rgba(255,255,255,0.85)',
  overlayLighter: 'rgba(255,255,255,0.2)',

  // Surfaces (tinted card / chip backgrounds)
  surfaceMuted: '#F8F8F8',
  chipCountBg: '#F9F9F9',
  surfaceBlue: '#E5F2F9',
  surfaceBlueSoft: '#EDF6FB',
  heroLime: '#DCEA8F',
  heroLimeSoft: '#EAF2BC',
  metaLime: '#E6F0AF',
  streakInactive: '#EEF7EC',
  chipPinkBg: '#F2D1D0',
  onboardBlue: '#71A6EE',
  onboardBlueSoft: '#CADDF7',
};

export const darkColors = {
  ...lightColors,
  navy: '#FFFFFF',
  navyDark: '#E1E9F1',
  white: '#16233D',
  screenBg: '#1B2A4A',
  
  ink: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#AAB2C2',
  textSlate: '#AAB2C2',
  navyDeep: '#FFFFFF',

  border: '#2C3A5A',
  chipBg: '#233252',
  blueSoft: '#233252',
  cardBlue: '#2C3A5A',
  blueCard: '#233252',
  pinkSoft: '#3F2730',
  lime: '#2A301A',
  limeSoft: '#2A301A',
  purpleSoft: '#2D2736',
  cream: '#363428',
  overlayLight: 'rgba(22,35,61,0.85)',
  overlayLighter: 'rgba(22,35,61,0.2)',

  // Surfaces adapt to dark theme
  surfaceMuted: '#1F2E4A',
  chipCountBg: '#233252',
  surfaceBlue: '#233252',
  surfaceBlueSoft: '#233252',
  heroLime: '#2A301A',
  heroLimeSoft: '#2A301A',
  metaLime: '#2A301A',
  streakInactive: '#243024',
  chipPinkBg: '#3F2730',
  onboardBlue: '#3A5480',
  onboardBlueSoft: '#2C3A5A',
};

export const colors = lightColors;

export type AppColors = typeof lightColors;

export function useAppTheme() {
  const scheme = useColorScheme();
  return { colors: scheme === 'dark' ? darkColors : lightColors };
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  pill: 999,
} as const;

// use fontFamily, not fontWeight — Android double-applies weight on top of weighted files
export const fonts = {
  regular: 'InterDisplay-Regular',
  medium: 'InterDisplay-Medium',
  semiBold: 'InterDisplay-SemiBold',
  bold: 'InterDisplay-Bold',
  extraBold: 'InterDisplay-ExtraBold',
  interMedium: 'Inter-Medium',
} as const;

export type Color = (typeof colors)[keyof typeof colors];
