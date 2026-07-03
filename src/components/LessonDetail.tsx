import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import AbcboySvg from '../assets/abcboy.svg';
import { LESSONS, Lesson } from '../data';
import AiBuddyBanner from './AiBuddyBanner';
import MetaChip from './MetaChip';
import PlayButton from './PlayButton';
import { BackIcon, CheckIcon, ClockIcon } from './icons';

const PROGRESS_SIZE = 54;
const PROGRESS_STROKE = 4;
const PROGRESS_R = (PROGRESS_SIZE - PROGRESS_STROKE) / 2;
const PROGRESS_C = 2 * Math.PI * PROGRESS_R;

function ProgressCircle({ progress, label }: { progress: number; label: string }) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.progressCircle}>
      <Svg width={PROGRESS_SIZE} height={PROGRESS_SIZE} style={StyleSheet.absoluteFill}>
        <Circle
          cx={PROGRESS_SIZE / 2}
          cy={PROGRESS_SIZE / 2}
          r={PROGRESS_R}
          stroke={colors.border}
          strokeWidth={PROGRESS_STROKE}
          fill={colors.white}
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
          rotation={-90}
          originX={PROGRESS_SIZE / 2}
          originY={PROGRESS_SIZE / 2}
        />
      </Svg>
      <Text style={styles.progressText}>{label}</Text>
    </View>
  );
}

interface LessonDetailProps {
  onBack: () => void;
  insideTabs?: boolean;
}

function TimelineNode({ lesson, isLast }: { lesson: Lesson; isLast: boolean }) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const NODE_SIZE = 48;
  const NODE_STROKE = 5;
  const NODE_R = (NODE_SIZE - NODE_STROKE) / 2;
  const NODE_C = 2 * Math.PI * NODE_R;

  return (
    <View style={styles.row}>
      <View style={styles.timelineCol}>
        <View
          style={[
            styles.node,
            lesson.state === 'done' && styles.nodeDone,
            lesson.state === 'current' && styles.nodeCurrent,
          ]}
        >
          {lesson.state === 'done' ? (
            <View style={styles.doneInner}>
              <CheckIcon color={colors.white} />
            </View>
          ) : lesson.state === 'current' ? (
            <>
              <Svg width={NODE_SIZE} height={NODE_SIZE} style={StyleSheet.absoluteFill}>
                <Circle
                  cx={NODE_SIZE / 2}
                  cy={NODE_SIZE / 2}
                  r={NODE_R}
                  stroke={colors.border}
                  strokeWidth={NODE_STROKE}
                  fill="none"
                />
                <Circle
                  cx={NODE_SIZE / 2}
                  cy={NODE_SIZE / 2}
                  r={NODE_R}
                  stroke={colors.greenDeep}
                  strokeWidth={NODE_STROKE}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${NODE_C * 0.75} ${NODE_C}`}
                  rotation="-90"
                  origin={`${NODE_SIZE / 2}, ${NODE_SIZE / 2}`}
                />
              </Svg>
              <View style={styles.currentInner}>
                <Text style={styles.nodeNumCurrent}>{lesson.n}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.nodeNum}>{lesson.n}</Text>
          )}
        </View>
        {!isLast && (
          <View style={[styles.connector, lesson.state === 'done' && styles.connectorDone]} />
        )}
      </View>

      <View
        style={[styles.card, { backgroundColor: colors[lesson.bg] }, lesson.faded && styles.cardFaded]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <View style={styles.cardTimePill}>
            <ClockIcon size={11} color={colors.navy} />
            <Text style={styles.cardTime}>{lesson.time}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardDesc}>{lesson.desc}</Text>
          {!lesson.faded && <PlayButton label={lesson.action} style={styles.actionBtn} />}
        </View>
      </View>
    </View>
  );
}

export default function LessonDetail({ onBack, insideTabs = false }: LessonDetailProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.hero}>
        <View style={styles.heroInner}>
          <View style={styles.heroTopRow}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
              <BackIcon />
            </TouchableOpacity>
          </View>

          <Text style={styles.heroTag}>Letters</Text>
          <Text style={styles.heroTitle}>Learn ABC with{'\n'}fun sounds</Text>

          <View style={styles.heroMetaRow}>
            <MetaChip icon="book" label="26 lessons" translucent />
            <MetaChip icon="clock" label="1hr 30 min" translucent />
          </View>

          <AbcboySvg width={220} height={260} style={styles.heroImg} />

          <View style={styles.heroBuddy}>
            <AiBuddyBanner style={styles.buddyFlex} />
            <ProgressCircle progress={0.12} label="12%" />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.listContent, insideTabs && styles.listContentTabs]}
        showsVerticalScrollIndicator={false}
      >
        {LESSONS.map((lesson, idx) => (
          <TimelineNode key={lesson.n} lesson={lesson} isLast={idx === LESSONS.length - 1} />
        ))}
      </ScrollView>
    </View>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  hero: {
    backgroundColor: colors.lime,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  heroInner: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.overlayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  heroImg: {
    position: 'absolute',
    right: -12,
    top: 10,
  },
  heroTag: {
    color: colors.navy,
    opacity: 0.6,
    fontSize: 14,
    marginTop: spacing.md,
    fontFamily: fonts.regular,
  },
  heroTitle: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 26,
    lineHeight: 34,
    marginTop: 4,
  },
  heroMetaRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  heroBuddy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.overlayLight,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  buddyFlex: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
  },
  progressCircle: {
    width: PROGRESS_SIZE,
    height: PROGRESS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: colors.navy,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  listContentTabs: {
    paddingBottom: 110,
  },
  row: {
    flexDirection: 'row',
  },
  timelineCol: {
    width: 48,
    alignItems: 'center',
  },
  node: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeDone: {
    borderColor: colors.greenDeep,
    borderWidth: 5,
    backgroundColor: colors.white,
  },
  doneInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.greenDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCurrent: {
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  currentInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.blueCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeNum: {
    fontFamily: fonts.bold,
    color: colors.textSecondary,
    fontSize: 16,
  },
  nodeNumCurrent: {
    fontFamily: fonts.medium,
    color: colors.navy,
    fontSize: 18,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  connectorDone: {
    width: 6,
    backgroundColor: colors.greenDeep,
    marginVertical: 0,
  },
  card: {
    flex: 1,
    marginLeft: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  cardFaded: {
    opacity: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  cardTitle: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  cardTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardTime: {
    color: colors.navy,
    fontSize: 11,
    fontFamily: fonts.semiBold,
  },
  cardDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
    marginRight: spacing.md,
    fontFamily: fonts.medium,
  },
  actionBtn: {},
});
