import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { BlurView } from '@sbaiahmed1/react-native-blur';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import AbcboySvg from '../assets/abcboy.svg';
import EbookLineSvg from '../assets/ebookline.svg';
import { LESSONS, Lesson } from '../data';
import AiBuddyBanner from './AiBuddyBanner';
import LessonProgressCircle from './LessonProgressCircle';
import MetaChip from './MetaChip';
import PlayButton from './PlayButton';
import { BackIcon, CheckIcon, ClockIcon } from './icons';

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

  const cardBg = { backgroundColor: colors[lesson.bg] };
  const timePillBg = { backgroundColor: lesson.timeBg };
  const descTextColor = { color: lesson.descColor };

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
                  rotation="0"
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

      <View style={[styles.card, cardBg, lesson.faded && styles.cardFaded]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{lesson.title}</Text>
          <View style={[styles.cardTimePill, timePillBg]}>
            <ClockIcon size={11} color={colors.navy} />
            <Text style={styles.cardTime}>{lesson.time}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          <Text style={[styles.cardDesc, descTextColor]}>{lesson.desc}</Text>
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

          <EbookLineSvg width={400} height={200} style={styles.heroLine} />
          <AbcboySvg width={220} height={260} style={styles.heroImg} />

          <View style={styles.heroBuddy}>
            <BlurView
              style={styles.heroBuddyBlur}
              blurType="light"
              blurAmount={30}
              reducedTransparencyFallbackColor="transparent"
            />
            <AiBuddyBanner style={styles.buddyFlex} />
            <LessonProgressCircle progress={0.12} label="12%" />
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
    backgroundColor: colors.heroLime,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  heroInner: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: colors.heroLimeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  heroImg: {
    position: 'absolute',
    right: -12,
    top: 10,
  },
  heroLine: {
    position: 'absolute',
    right: -100,
    top: -20,
    opacity: 1,
  },
  heroTag: {
    color: colors.textSlate,
    fontSize: 14,
    marginTop: spacing.md,
    fontFamily: fonts.regular,
    lineHeight: 14,
    letterSpacing: -0.15,
  },
  heroTitle: {
    color: colors.ink,
    fontFamily: fonts.medium,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: -0.28,
    marginTop: spacing.xs,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: 25,
    overflow: 'hidden',
  },
  heroBuddyBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  buddyFlex: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
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
    marginVertical: spacing.xs,
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
    color: colors.ink,
    fontFamily: fonts.interMedium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.18,
  },
  cardTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: spacing.xs,
  },
  cardTime: {
    color: colors.navy,
    fontSize: 11,
    fontFamily: fonts.semiBold,
  },
  cardDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.13,
    flex: 1,
    marginRight: spacing.md,
    fontFamily: fonts.regular,
  },
  actionBtn: {},
});
