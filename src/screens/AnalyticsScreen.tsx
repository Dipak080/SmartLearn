import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Pattern, Line, Rect } from 'react-native-svg';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import { WEEK_DAYS, SKILLS, Skill, STREAK, SKILL_BARS } from '../data';
import { NOTIFICATIONS } from '../data/homeUi';
import SelectableChip from '../components/SelectableChip';
import { BellIcon, FireIcon, NotificationIcon } from '../components/icons';

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
          <Line x1={0} y1={0} x2={0} y2={6} stroke={colors.navy} strokeWidth={2} />
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
            <BellIcon />
            <View style={styles.bellDot} />
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
            {STREAK.activeDays.map((active, i) => (
              <View
                key={WEEK_DAYS[i]}
                style={[
                  styles.streakSeg,
                  active && styles.streakSegActive,
                  i === 0 && styles.segFirst,
                  i === STREAK.activeDays.length - 1 && styles.segLast,
                ]}
              >
                <View style={[styles.streakTick, !active && styles.streakTickInactive]} />
                {i === STREAK.todayIndex && (
                  <View style={styles.flame}>
                    <FireIcon size={35} colored />
                  </View>
                )}
              </View>
            ))}
          </View>
          <View style={styles.daysRow}>
            {WEEK_DAYS.map((day) => (
              <Text key={day} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>

          {showTip && (
            <View style={styles.tip}>
              <Image
                source={require('../assets/robot2.png')}
                style={styles.tipIcon}
                resizeMode="contain"
              />
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
              <Text style={styles.cardTitle}>Skill progress</Text>
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
              return (
                <View key={WEEK_DAYS[i]} style={styles.barCol}>
                  {bar.highlighted ? (
                    <>
                      <View style={styles.barBadge}>
                        <Text style={styles.barBadgeText}>+30%</Text>
                      </View>
                      <View style={[styles.barSolid, { height }]} />
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
          <View style={[styles.dropdown, styles.notifDropdown, { top: dropdownTop }]}>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    color: colors.navy,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pink,
  },
  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    backgroundColor: colors.screenBg,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: fonts.medium,
    color: colors.navy,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakCount: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.navy,
  },
  streakTotal: {
    color: colors.textMuted,
    fontFamily: fonts.semiBold,
  },
  streakTrack: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    height: 34,
    gap: 3,
  },
  streakSeg: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakSegActive: {
    backgroundColor: colors.greenSoft,
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
  flame: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fonts.regular,
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
  tipText: {
    flex: 1,
    color: colors.navy,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  tipClose: {
    color: colors.textSecondary,
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: 'System',
  },
  progressCard: {
    backgroundColor: colors.blueSoft,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subtle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
  weekChip: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  weekChipText: {
    fontSize: 12,
    color: colors.navy,
    fontFamily: fonts.semiBold,
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
    backgroundColor: colors.navy,
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
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 8,
    fontFamily: fonts.regular,
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
    paddingVertical: 12,
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
    paddingVertical: 12,
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
