import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { BlurView } from '@sbaiahmed1/react-native-blur';

import { fonts, useAppTheme, type AppColors } from '../theme';

const PROGRESS_SIZE = 54;
const PROGRESS_STROKE = 4;
const PROGRESS_R = (PROGRESS_SIZE - PROGRESS_STROKE) / 2;
const PROGRESS_C = 2 * Math.PI * PROGRESS_R;

interface LessonProgressCircleProps {
  progress: number;
  label: string;
}

export default function LessonProgressCircle({ progress, label }: LessonProgressCircleProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.progressCircle}>
      <BlurView
        style={styles.progressBlur}
        blurType="light"
        blurAmount={25}
        reducedTransparencyFallbackColor="transparent"
      />
      <Svg width={PROGRESS_SIZE} height={PROGRESS_SIZE} style={StyleSheet.absoluteFill}>
        <Circle
          cx={PROGRESS_SIZE / 2}
          cy={PROGRESS_SIZE / 2}
          r={PROGRESS_R}
          stroke={colors.border}
          strokeWidth={PROGRESS_STROKE}
          fill="rgba(255,255,255,0.3)"
        />
        <Circle
          cx={PROGRESS_SIZE / 2}
          cy={PROGRESS_SIZE / 2}
          r={PROGRESS_R}
          stroke={colors.greenDeep}
          strokeWidth={PROGRESS_STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${PROGRESS_C * progress} ${PROGRESS_C}`}
          rotation={180}
          originX={PROGRESS_SIZE / 2}
          originY={PROGRESS_SIZE / 2}
        />
      </Svg>
      <Text style={styles.progressText}>{label}</Text>
    </View>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  progressCircle: {
    width: PROGRESS_SIZE,
    height: PROGRESS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: PROGRESS_SIZE / 2,
    overflow: 'hidden',
  },
  progressBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: PROGRESS_SIZE / 2,
  },
  progressText: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
});
