import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Pressable, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import CountryFlag from 'react-native-country-flag';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import GirlWithPenSvg from '../assets/girlwithpen.svg';
import NotificationSvg from '../assets/notification.svg';
import EbookLineSvg from '../assets/ebookline.svg';
import CroseSvg from '../assets/crose.svg';
import { CATEGORIES, COURSES, Course, CategoryIcon, TODAYS_PICK } from '../data';
import { LANGUAGES, NOTIFICATIONS, type Language } from '../data/homeUi';
import AiBuddyBanner from '../components/AiBuddyBanner';
import MetaChip from '../components/MetaChip';
import PlayButton from '../components/PlayButton';
import SelectableChip from '../components/SelectableChip';
import {
  BookOutlineIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  NotificationIcon,
  PaletteIcon,
  PlayIcon,
  ShapesIcon,
} from '../components/icons';
import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Home'>;

const FLAG_BADGE_SIZE = 16;

function FlagBadge({ countryCode, style }: { countryCode: string; style?: object }) {
  return (
    <View style={[flagBadgeStyles.wrap, style]}>
      <CountryFlag
        isoCode={countryCode}
        size={FLAG_BADGE_SIZE}
        style={flagBadgeStyles.flag}
      />
    </View>
  );
}

const flagBadgeStyles = StyleSheet.create({
  wrap: {
    width: FLAG_BADGE_SIZE,
    height: FLAG_BADGE_SIZE,
    borderRadius: FLAG_BADGE_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  flag: {
    width: FLAG_BADGE_SIZE,
    height: FLAG_BADGE_SIZE,
    borderRadius: FLAG_BADGE_SIZE / 2,
  },
});

function CategoryGlyph({ icon, size = 16, active = false }: { icon: CategoryIcon; size?: number; active?: boolean }) {
  const { colors } = useAppTheme();
  const glyphColor = active ? colors.white : colors.navy;
  const glyphStyles = StyleSheet.create({
    aa: {
      color: glyphColor,
      fontFamily: fonts.bold,
    },
  });

  if (icon === 'palette') {
    return <PaletteIcon size={size} color={glyphColor} />;
  }
  if (icon === 'shapes') {
    return <ShapesIcon size={size} color={glyphColor} />;
  }
  return <Text style={[glyphStyles.aa, { fontSize: size }]}>Aa</Text>;
}

const RING_SIZE = 48;
const RING_STROKE = 4.5;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const RING_C = 2 * Math.PI * RING_R;

function ProgressPlay({ progress }: { progress: number }) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.ringWrap}>
      <Svg width={RING_SIZE} height={RING_SIZE} style={StyleSheet.absoluteFill}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          stroke="#CED5DD"
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          stroke={colors.navyDark}
          strokeWidth={RING_STROKE}
          strokeLinecap="butt"
          fill="none"
          strokeDasharray={`${RING_C * progress} ${RING_C}`}
          rotation={120}
          originX={RING_SIZE / 2}
          originY={RING_SIZE / 2}
          scaleX={-1}
        />
      </Svg>
      <TouchableOpacity style={styles.pickPlay} activeOpacity={0.85}>
        <PlayIcon size={18} color={colors.navy} />
      </TouchableOpacity>
    </View>
  );
}

function CourseCard({ course, onStart }: { course: Course; onStart: () => void }) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const { width: windowWidth } = useWindowDimensions();
  const hasGradient = course.id === 'colors';
  const cardWidth = { width: Math.min(280, windowWidth * 0.78) };
  const cardBg = !hasGradient && { backgroundColor: colors[course.bg] };
  return (
    <View style={[styles.courseCard, cardWidth, cardBg]}>
      {hasGradient && (
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="colorsCardBg" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#EBDCFA" />
              <Stop offset="1" stopColor="#E0CCF6" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#colorsCardBg)" />
        </Svg>
      )}
      <View style={styles.courseMetaRow}>
        <View style={styles.courseIconCircle}>
          <CategoryGlyph icon={course.icon} size={course.icon === 'palette' ? 20 : 18} />
        </View>
        <View style={styles.courseMetaChips}>
          <MetaChip icon="book" label={course.lessons} />
          <MetaChip icon="clock" label={course.time} />
        </View>
      </View>

      <Text style={styles.courseTag}>{course.tag}</Text>
      <Text style={styles.courseTitle}>{course.title}</Text>

      <course.illustration width={145} height={145} style={styles.courseImage} />
      {hasGradient ? (
        <CroseSvg width={350} height={300} style={styles.courseLine} />
      ) : (
        <EbookLineSvg width={150} height={300} style={styles.courseLine} />
      )}

      <PlayButton label="Start learning" variant="card" onPress={onStart} style={styles.startBtn} />
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openMenu, setOpenMenu] = useState<'lang' | 'notif' | null>(null);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const openNotifications = () => {
    setOpenMenu('notif');
  };

  const dropdownTop = insets.top + 64;
  const dropdownTopStyle = { top: dropdownTop };
  const fadeStyle = { opacity: fadeAnim };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={fadeStyle}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.headerText}>
            <View style={styles.helloRow}>
              <Text style={styles.hello}>Hello Max 👋</Text>
            </View>
            <Text style={styles.greeting}>Good Morning</Text>
          </View>
          <TouchableOpacity
            style={styles.langChip}
            activeOpacity={0.8}
            onPress={() => setOpenMenu('lang')}
          >
            <View style={styles.langChipContent}>
              <FlagBadge countryCode={language.countryCode} />
              <Text style={styles.langText}>{language.label}</Text>
            </View>
            <View style={openMenu === 'lang' ? styles.chevronUp : null}>
              <ChevronDownIcon size={13} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bell} activeOpacity={0.8} onPress={openNotifications}>
            <NotificationSvg width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.pickCard}>
          <GirlWithPenSvg width={96} height={132} style={styles.pickIllustration} />
          <View style={styles.pickDoodle}>
            <Image
              source={require('../assets/light.png')}
              style={styles.pickDoodleImg}
              resizeMode="stretch"
            />
          </View>
          <AiBuddyBanner style={styles.buddyInline} />
          <View style={styles.pickBottom}>
            <View style={styles.pickInfo}>
              <Text
                style={styles.pickTitle}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                Today's pick: {TODAYS_PICK.title}
              </Text>
              <View style={styles.pickMetaRow}>
                <BookOutlineIcon size={14} color={colors.textSecondary} />
                <Text style={styles.pickMeta}>{TODAYS_PICK.lessons}</Text>
                <Text style={styles.pickMetaDot}>·</Text>
                <ClockIcon size={13} color={colors.textSecondary} />
                <Text style={styles.pickMeta}>{TODAYS_PICK.time}</Text>
              </View>
            </View>
            <Text style={styles.pickPercent}>
              <Text style={styles.pickPercentStrong}>{Math.round(TODAYS_PICK.progress * 100)}% </Text>
              complete
            </Text>
            <ProgressPlay progress={TODAYS_PICK.progress} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Let's learn</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {CATEGORIES.map((category) => (
            <SelectableChip
              key={category.key}
              label={category.label}
              count={category.count}
              icon={
                category.icon && (
                  <CategoryGlyph
                    icon={category.icon}
                    size={20}
                    active={activeCategory === category.key}
                  />
                )
              }
              active={activeCategory === category.key}
              onPress={() => setActiveCategory(category.key)}
            />
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesRow}
        >
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onStart={() => navigation.navigate('Lesson')}
            />
          ))}
        </ScrollView>
      </Animated.ScrollView>

      <Modal
        visible={openMenu === 'lang'}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenMenu(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpenMenu(null)}>
          <View style={[styles.dropdown, styles.langDropdown, dropdownTopStyle]}>
            {LANGUAGES.map((lang, i) => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.dropdownRow, i > 0 && styles.dropdownRowBorder]}
                activeOpacity={0.7}
                onPress={() => {
                  setLanguage(lang);
                  setOpenMenu(null);
                }}
              >
                <FlagBadge countryCode={lang.countryCode} style={styles.dropdownFlag} />
                <Text
                  style={[
                    styles.dropdownLabel,
                    lang.code === language.code && styles.dropdownLabelActive,
                  ]}
                >
                  {lang.label}
                </Text>
                {lang.code === language.code && <CheckIcon size={15} color={colors.blue} />}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={openMenu === 'notif'}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenMenu(null)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpenMenu(null)}>
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
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.blueSoft,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  helloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hello: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  greeting: {
    color: colors.navy,
    fontFamily: fonts.interMedium,
    fontSize: 15,
    marginTop: 1,
  },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.chipBg,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginLeft: spacing.sm,
    marginRight: 3,
  },
  langChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langText: {
    fontSize: 12,
    color: colors.navy,
    fontFamily: fonts.interMedium,
    lineHeight: 18,
    letterSpacing: -0.13,
    textAlign: 'center',
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
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
  langDropdown: {
    width: 200,
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
  dropdownRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dropdownFlag: {
    marginRight: spacing.md,
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
  pickCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.blueCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pickIllustration: {
    position: 'absolute',
    top: -10,
    right: 6,
    opacity: 1,
    transform: [{ rotate: '-3deg' }],
  },
  pickDoodle: {
    position: 'absolute',
    right: 8,
    top: 34,
    width: 33,
    height: 31,
  },
  pickDoodleImg: {
    position: 'absolute',
    left: 6.4,
    top: 2.4,
    width: 19.8,
    height: 26,
    transform: [{ rotate: '56.58deg' }],
  },
  buddyInline: {
    backgroundColor: 'transparent',
    marginLeft: -16,
    marginRight: 64,
  },
  pickBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginHorizontal: -7,
    marginBottom: -7,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.md,
    overflow: 'hidden',
    paddingLeft: spacing.md,
    paddingRight: 10,
    paddingVertical: spacing.md,
  },
  pickInfo: {
    flex: 1,
  },
  pickTitle: {
    color: colors.ink,
    fontFamily: fonts.interMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.15,
    paddingBottom: 1,
  },
  pickMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  pickMeta: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  pickMetaDot: {
    color: colors.textSecondary,
    fontSize: 12,
    marginHorizontal: 2,
  },
  pickPercent: {
    color: colors.textSlate,
    fontSize: 12,
    marginRight: 6,
    marginLeft: 6,
    fontFamily: fonts.regular,
    lineHeight: 12,
    letterSpacing: -0.13,
  },
  pickPercentStrong: {
    color: '#121111',
    fontFamily: fonts.regular,
    letterSpacing: -0.13,
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickPlay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: fonts.medium,
    color: colors.ink,
    lineHeight: 26,
    letterSpacing: -0.29,
    marginTop: spacing.xl,
    marginHorizontal: spacing.md,
  },
  chipsRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  coursesRow: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  courseCard: {
    minHeight: 315,
    borderRadius: 32,
    padding: spacing.lg,
    marginRight: spacing.lg,
    overflow: 'hidden',
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseMetaChips: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  courseTag: {
    color: colors.navy,
    opacity: 0.6,
    marginTop: spacing.md,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  courseTitle: {
    color: colors.ink,
    fontFamily: fonts.medium,
    fontSize: 28,
    marginTop: spacing.xs,
    lineHeight: 28,
    letterSpacing: -0.31,
  },
  courseImage: {
    width: 145,
    height: 145,
    alignSelf: 'flex-end',
    marginTop: -12,
    marginBottom: -30,
    opacity: 1,
  },
  courseLine: {
    position: 'absolute',
    right: 10,
    top: 20,
    opacity: 1,
  },
  startBtn: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingLeft: 18,
    marginTop: 'auto',
    marginBottom: spacing.sm,
    marginLeft: -4,
  },
});
