import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Pressable, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import CountryFlag from 'react-native-country-flag';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import GirlWithPenSvg from '../assets/girlwithpen.svg';
import { CATEGORIES, COURSES, Course, CategoryIcon } from '../data';
import { LANGUAGES, NOTIFICATIONS, type Language } from '../data/homeUi';
import AiBuddyBanner from '../components/AiBuddyBanner';
import MetaChip from '../components/MetaChip';
import PlayButton from '../components/PlayButton';
import SelectableChip from '../components/SelectableChip';
import {
  BellIcon,
  BookOutlineIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  NotificationIcon,
  PaletteIcon,
  PlayIcon,
  WaveIcon,
} from '../components/icons';
import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Home'>;

const FLAG_SIZE = 16;

function FlagBadge({ countryCode, style }: { countryCode: string; style?: object }) {
  return (
    <View style={[flagBadgeStyles.wrap, style]}>
      <CountryFlag isoCode={countryCode} size={FLAG_SIZE} />
    </View>
  );
}

const flagBadgeStyles = StyleSheet.create({
  wrap: {
    width: FLAG_SIZE * 1.6,
    height: FLAG_SIZE,
    borderRadius: 2,
    overflow: 'hidden',
  },
});

function CategoryGlyph({ icon, size = 16 }: { icon: CategoryIcon; size?: number }) {
  const { colors } = useAppTheme();
  const glyphStyles = StyleSheet.create({
    aa: {
      color: colors.navy,
      fontFamily: fonts.bold,
    },
  });

  if (icon === 'palette') {
    return <PaletteIcon size={size + 2} />;
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
          stroke={colors.navyDark}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${RING_C * progress} ${RING_C}`}
          rotation={-60}
          originX={RING_SIZE / 2}
          originY={RING_SIZE / 2}
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
  return (
    <View style={[styles.courseCard, { backgroundColor: colors[course.bg] }]}>
      <View style={styles.courseMetaRow}>
        <View style={styles.courseIconCircle}>
          <CategoryGlyph icon={course.icon} size={18} />
        </View>
        <View style={styles.courseMetaChips}>
          <MetaChip icon="book" label={course.lessons} />
          <MetaChip icon="clock" label={course.time} />
        </View>
      </View>

      <Text style={styles.courseTag}>{course.tag}</Text>
      <Text style={styles.courseTitle}>{course.title}</Text>

      <course.illustration width={140} height={130} style={styles.courseImage} />

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
  const [hasUnread, setHasUnread] = useState(true);
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
    setHasUnread(false);
  };

  const dropdownTop = insets.top + 64;
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
              <Text style={styles.hello}>Hello Max </Text>
              <WaveIcon size={14} />
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
            <BellIcon />
            {hasUnread && <View style={styles.bellDot} />}
          </TouchableOpacity>
        </View>

        <View style={styles.pickCard}>
          <GirlWithPenSvg width={82} height={104} style={styles.pickIllustration} />
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
                minimumFontScale={0.8}
              >
                Today's pick: Shapes
              </Text>
              <View style={styles.pickMetaRow}>
                <BookOutlineIcon size={14} color={colors.textSecondary} />
                <Text style={styles.pickMeta}>12 lessons</Text>
                <Text style={styles.pickMetaDot}>·</Text>
                <ClockIcon size={13} color={colors.textSecondary} />
                <Text style={styles.pickMeta}>10 min</Text>
              </View>
            </View>
            <Text style={styles.pickPercent}>
              <Text style={styles.pickPercentStrong}>20% </Text>
              complete
            </Text>
            <ProgressPlay progress={0.82} />
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
              icon={category.icon && <CategoryGlyph icon={category.icon} size={13} />}
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
          <View style={[styles.dropdown, styles.langDropdown, { top: dropdownTop }]}>
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
    paddingHorizontal: spacing.xl,
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
    fontFamily: fonts.bold,
    fontSize: 12,
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
    marginRight: spacing.sm,
  },
  langChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langText: {
    fontSize: 13,
    color: colors.navy,
    fontFamily: fonts.semiBold,
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
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pink,
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
    paddingVertical: 12,
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
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    backgroundColor: colors.blueCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pickIllustration: {
    position: 'absolute',
    top: -6,
    right: 6,
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
    marginRight: 96,
  },
  pickBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingLeft: spacing.md,
    paddingRight: 10,
    paddingVertical: spacing.md,
  },
  pickInfo: {
    flex: 1,
  },
  pickTitle: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 13,
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
    color: colors.textSecondary,
    fontSize: 12,
    marginRight: 6,
    marginLeft: 6,
    fontFamily: fonts.regular,
  },
  pickPercentStrong: {
    color: colors.navy,
    fontFamily: fonts.regular,
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
    fontSize: 22,
    fontFamily: fonts.medium,
    color: colors.navy,
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
  },
  chipsRow: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  coursesRow: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  courseCard: {
    width: 306,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginRight: 16,
    overflow: 'hidden',
    minHeight: 300,
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
    marginTop: spacing.lg,
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  courseTitle: {
    color: colors.navy,
    fontFamily: fonts.extraBold,
    fontSize: 24,
    marginTop: 4,
    lineHeight: 30,
  },
  courseImage: {
    width: 150,
    height: 130,
    alignSelf: 'flex-end',
    marginVertical: spacing.sm,
  },
  startBtn: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingLeft: 18,
    marginTop: 'auto',
  },
});
