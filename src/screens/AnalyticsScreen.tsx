import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Pattern, Line, Rect, Path } from 'react-native-svg';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import { WEEK_DAYS, SKILLS, Skill, STREAK, SKILL_BARS } from '../data';
import { NOTIFICATIONS } from '../data/homeUi';
import SelectableChip from '../components/SelectableChip';
import { NotificationIcon } from '../components/icons';
import NotificationSvg from '../assets/notification.svg';
import FireSvg from '../assets/fire.svg';

const CHART_HEIGHT = 180;
const BAR_WIDTH = 24;

function HatchedBar({ height }: { height: number }) {
  const { colors } = useAppTheme();
  return (
    <Svg width={BAR_WIDTH} height={height} viewBox={`0 0 ${BAR_WIDTH} ${height}`}>
      <Defs>
        <Pattern
          id="hatch"
          width={6}
          height={6}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <Line x1={0} y1={0} x2={0} y2={6} stroke="#1C274C" strokeWidth={2} />
        </Pattern>
      </Defs>
      <Rect x={0} y={0} width={BAR_WIDTH} height={height} rx={10} fill="url(#hatch)" opacity={0.5} />
    </Svg>
  );
}

export default function AnalyticsScreen() {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const [skill, setSkill] = useState<Skill>('Letters');
  const [showTip, setShowTip] = useState(true);
  const [openNotif, setOpenNotif] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState('This Week');
  const insets = useSafeAreaInsets();

  const dropdownTop = insets.top + 64;
  const dropdownTopStyle = { top: dropdownTop };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <TouchableOpacity
            style={styles.bell}
            onPress={() => setOpenNotif(true)}
            activeOpacity={0.8}
          >
            <NotificationSvg width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.streakHeader}>
            <Text style={styles.cardTitle}>Your streak</Text>
            <Text style={styles.streakCount}>
              {STREAK.current}
              <Text style={styles.streakTotal}>/{STREAK.goal}</Text>
            </Text>
          </View>

          <View style={styles.streakTrack}>
            {STREAK.activeDays.map((active, i) => {
              const isFlame = i === STREAK.todayIndex;
              const filled = active || i < STREAK.todayIndex;
              return (
                <View
                  key={WEEK_DAYS[i]}
                  style={[
                    styles.streakSeg,
                    filled && styles.streakSegActive,
                    i === 0 && styles.segFirst,
                    i === STREAK.activeDays.length - 1 && styles.segLast,
                    isFlame && styles.flameSeg,
                  ]}
                >
                  {isFlame && <View style={styles.flameHalfFill} />}
                  {!isFlame && (
                    <View style={[styles.streakTick, !active && styles.streakTickInactive]} />
                  )}
                  {isFlame && (
                    <View style={styles.flame}>
                      <FireSvg width={24} height={24} />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.daysRow}>
            {WEEK_DAYS.map((day, i) => (
              <Text
                key={day}
                style={[styles.dayLabel, i < STREAK.todayIndex && styles.dayLabelActive]}
              >
                {day}
              </Text>
            ))}
          </View>

          {showTip && (
            <View style={styles.tip}>
              <View style={styles.tipRobot}>
                <Svg width={38} height={39} viewBox="0 0 46 47" style={StyleSheet.absoluteFill}>
                  <Rect x={8} y={12} width={34} height={34} rx={17} fill="#3C425F" />
                  <Path
                    d="M41.8867 0.0788637C41.9256 -0.0262883 42.0744 -0.0262877 42.1133 0.0788643L43.1225 2.80617C43.1347 2.83923 43.1608 2.8653 43.1938 2.87753L45.9211 3.88673C46.0263 3.92564 46.0263 4.07436 45.9211 4.11327L43.1938 5.12247C43.1608 5.1347 43.1347 5.16077 43.1225 5.19383L42.1133 7.92114C42.0744 8.02629 41.9256 8.02629 41.8867 7.92114L40.8775 5.19383C40.8653 5.16077 40.8392 5.1347 40.8062 5.12247L38.0789 4.11327C37.9737 4.07436 37.9737 3.92564 38.0789 3.88673L40.8062 2.87753C40.8392 2.8653 40.8653 2.83923 40.8775 2.80617L41.8867 0.0788637Z"
                    fill="#474D67"
                  />
                  <Path
                    d="M2.37059 42.0901C2.41505 41.97 2.58495 41.97 2.62941 42.0901L3.22333 43.6951C3.2373 43.7329 3.26708 43.7627 3.30485 43.7767L4.9099 44.3706C5.03003 44.415 5.03003 44.585 4.9099 44.6294L3.30485 45.2233C3.26708 45.2373 3.23731 45.2671 3.22333 45.3049L2.62941 46.9099C2.58495 47.03 2.41505 47.03 2.37059 46.9099L1.77667 45.3049C1.7627 45.2671 1.73292 45.2373 1.69515 45.2233L0.0900965 44.6294C-0.0300321 44.585 -0.0300322 44.415 0.0900965 44.3706L1.69515 43.7767C1.73292 43.7627 1.7627 43.7329 1.77667 43.6951L2.37059 42.0901Z"
                    fill="#474D67"
                  />
                </Svg>
                <Image
                  source={require('../assets/anrobot.png')}
                  style={styles.tipRobotImg}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.tipText}>You learn best with quick 5-min lessons.</Text>
              <TouchableOpacity onPress={() => setShowTip(false)} hitSlop={8}>
                <Text style={styles.tipClose}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={[styles.card, styles.progressCard]}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Skill progress</Text>
              <Text style={styles.subtle}>Avg improvement this week</Text>
            </View>
            <TouchableOpacity style={styles.weekChip} activeOpacity={0.8} onPress={() => setOpenFilter(true)}>
              <Text style={styles.weekChipText}>
                {filter} <Text style={styles.caret}>▾</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skillRow}
          >
            {SKILLS.map((s) => (
              <SelectableChip key={s} label={s} active={s === skill} onPress={() => setSkill(s)} />
            ))}
          </ScrollView>

          <View style={styles.chart}>
            {SKILL_BARS.map((bar, i) => {
              const height = Math.max(20, bar.value * CHART_HEIGHT);
              const barHeight = { height };
              return (
                <View key={WEEK_DAYS[i]} style={styles.barCol}>
                  {bar.highlighted ? (
                    <>
                      <View style={styles.barBadge}>
                        <Text style={styles.barBadgeText}>+30%</Text>
                      </View>
                      <View style={[styles.barSolid, barHeight]} />
                    </>
                  ) : (
                    <HatchedBar height={height} />
                  )}
                  <Text style={styles.barLabel}>{WEEK_DAYS[i]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={openNotif}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenNotif(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpenNotif(false)}>
          <View style={[styles.dropdown, styles.notifDropdown, dropdownTopStyle]}>
            <Text style={styles.dropdownTitle}>Notifications</Text>
            {NOTIFICATIONS.map((item, i) => (
              <View
                key={item.id}
                style={[styles.dropdownRow, i > 0 && styles.dropdownRowBorder]}
              >
                <View style={styles.notifIcon}>
                  <NotificationIcon name={item.icon} size={18} />
                </View>
                <View style={styles.notifTextCol}>
                  <Text style={styles.dropdownLabel} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={openFilter}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenFilter(false)}
      >
        <Pressable style={styles.filterBackdrop} onPress={() => setOpenFilter(false)}>
          <View style={styles.filterDropdown}>
            {['This Week', 'Last Week', 'This Month'].map((opt, i) => (
              <TouchableOpacity
                key={opt}
                style={[styles.filterRow, i > 0 && styles.dropdownRowBorder]}
                activeOpacity={0.7}
                onPress={() => {
                  setFilter(opt);
                  setOpenFilter(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownLabel,
                    opt === filter && styles.dropdownLabelActive,
                  ]}
                >
                  {opt}
                </Text>
                {opt === filter && <Text style={styles.dropdownCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    color: colors.ink,
    lineHeight: 26,
    letterSpacing: -0.29,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: fonts.interMedium,
    color: colors.ink,
    lineHeight: 20,
    letterSpacing: -0.22,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakCount: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.ink,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  streakTotal: {
    color: colors.textSlate,
    fontFamily: fonts.interMedium,
    letterSpacing: -0.13,
  },
  streakTrack: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    height: 34,
  },
  streakSeg: {
    flex: 1,
    backgroundColor: colors.streakInactive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakSegActive: {
    backgroundColor: colors.greenSoft,
  },
  flameSeg: {
    zIndex: 2,
    overflow: 'visible',
  },
  segFirst: {
    borderTopLeftRadius: radius.pill,
    borderBottomLeftRadius: radius.pill,
  },
  segLast: {
    borderTopRightRadius: radius.pill,
    borderBottomRightRadius: radius.pill,
  },
  streakTick: {
    width: 2,
    height: 14,
    backgroundColor: colors.green,
    borderRadius: 1,
  },
  streakTickInactive: {
    backgroundColor: colors.tickGrey,
  },
  flameHalfFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: colors.greenSoft,
  },
  flame: {
    position: 'absolute',
    width: 47,
    height: 47,
    borderRadius: 23.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingHorizontal: 2,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    color: colors.textSlate,
    fontSize: 12,
    fontFamily: fonts.medium,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  dayLabelActive: {
    color: colors.ink,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  tipIcon: {
    width: 26,
    height: 26,
    marginRight: spacing.sm,
  },
  tipRobot: {
    width: 38,
    height: 39,
    marginRight: spacing.sm,
  },
  tipRobotImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 38,
    height: 39,
  },
  tipText: {
    flex: 1,
    color: colors.ink,
    fontSize: 12,
    fontFamily: fonts.regular,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  tipClose: {
    color: colors.ink,
    fontSize: 14,
    paddingLeft: spacing.sm,
    fontFamily: 'System',
  },
  progressCard: {
    backgroundColor: colors.surfaceBlue,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subtle: {
    color: colors.textSlate,
    fontSize: 12,
    marginTop: spacing.xs,
    fontFamily: fonts.regular,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  progressTitle: {
    fontSize: 26,
    fontFamily: fonts.medium,
    color: colors.ink,
    lineHeight: 32,
    letterSpacing: -0.29,
  },
  weekChip: {
    width: 89,
    height: 38,
    backgroundColor: colors.surfaceBlueSoft,
    borderRadius: 24,
    padding: spacing.md,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekChipText: {
    fontSize: 10,
    color: colors.ink,
    fontFamily: fonts.semiBold,
    lineHeight: 10,
    letterSpacing: -0.11,
  },
  caret: {
    fontFamily: 'System',
  },
  skillRow: {
    marginTop: spacing.lg,
    paddingRight: spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    height: CHART_HEIGHT + 24,
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barSolid: {
    width: BAR_WIDTH,
    backgroundColor: colors.navyDeep,
    borderRadius: 12,
  },
  barBadge: {  
    backgroundColor: colors.badgeGrey,
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -30,
    zIndex: 1,
  },
  barBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: fonts.bold,
  },
  barLabel: {
    color: colors.ink,
    fontSize: 12,
    marginTop: spacing.sm,
    fontFamily: fonts.medium,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(27,42,74,0.18)',
  },
  dropdown: {
    position: 'absolute',
    right: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 6,
    shadowColor: colors.navy,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  notifDropdown: {
    width: 300,
    maxWidth: '88%',
  },
  dropdownTitle: {
    fontFamily: fonts.extraBold,
    color: colors.navy,
    fontSize: 15,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  notifIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  notifTextCol: {
    flex: 1,
  },
  notifTime: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
    fontFamily: fonts.regular,
  },
  filterBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(27,42,74,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterDropdown: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    width: 200,
    paddingVertical: 6,
    shadowColor: colors.navy,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  dropdownRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dropdownLabel: {
    flex: 1,
    color: colors.navy,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  dropdownLabelActive: {
    fontFamily: fonts.bold,
  },
  dropdownCheck: {
    color: colors.blue,
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
