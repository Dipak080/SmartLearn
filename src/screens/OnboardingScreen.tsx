import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import ApplemanSvg from '../assets/appleman.svg';
import AbcboySvg from '../assets/abcboy.svg';
import BookSvg from '../assets/book.svg';
import EbooklineSvg from '../assets/ebookline.svg';
import GirlWithPenSvg from '../assets/girlwithpen.svg';

import type { RootStackScreenProps } from '../navigation/types';

const STAR_PATH =
  'M19.6097 3.25166C19.9362 3.17446 20.1825 3.54501 19.9849 3.8161L14.8612 10.8473C14.799 10.9325 14.7773 11.0406 14.8015 11.1433L16.8039 19.6097C16.8811 19.9362 16.5105 20.1825 16.2395 19.9849L9.20826 14.8612C9.12303 14.7991 9.01492 14.7773 8.91229 14.8016L0.445813 16.8039C0.119385 16.8811 -0.126922 16.5106 0.070627 16.2395L5.19439 9.20827C5.2565 9.12304 5.27827 9.01493 5.254 8.91231L3.25164 0.445825C3.17444 0.119398 3.54499 -0.126909 3.81608 0.0706387L10.8473 5.1944C10.9325 5.25651 11.0406 5.27828 11.1432 5.25401L19.6097 3.25166Z';

type Props = RootStackScreenProps<'Onboarding'>;

const SLIDES = [
  {
    title: 'Personalized',
    pill: 'Learning',
    subtitle: "Lessons adapt to your child's pace, focusing on what they need most.",
  },
  {
    title: 'Instant',
    pill: 'Feedback',
    subtitle: 'Kids get hints and cheers right away, so every try helps them learn.',
  },
  {
    title: 'Fun Games',
    pill: '& Activities',
    subtitle: 'Playful games and activities keep your child excited to learn every day.',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState<'signup' | 'login' | null>(null);

  const handleAuth = (action: 'signup' | 'login') => {
    if (isLoading) return;
    setIsLoading(action);
    setTimeout(() => {
      setIsLoading(null);
      navigation.replace('Main', { screen: 'Home' });
    }, 800);
  };

  const { width: windowWidth } = useWindowDimensions();

  const slideWidth = windowWidth - spacing.xl * 2 - 12;
  const illusScale = Math.min(1, slideWidth / 333);

  const onSlideEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / slideWidth));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <EbooklineSvg width={333} height={506} style={styles.bgLine} />

        <View style={styles.logoWrap}>
          <View style={styles.logoBadge}>
            <BookSvg width={46} height={28} />
          </View>
        </View>

        <Text style={styles.brand}>SmartLearn</Text>

        <View style={styles.chipsWrap}>
          <View style={[styles.featureChip, styles.chipPink]}>
            <Text style={styles.chipText}>Instant Feedback</Text>
          </View>
          <View style={styles.doodle}>
            <Image
              source={require('../assets/light.png')}
              style={styles.doodleImg}
              resizeMode="stretch"
            />
          </View>
          <View style={[styles.featureChip, styles.chipLime]}>
            <Text style={[styles.chipText, styles.chipTextLime]}>Fun Games & Activities</Text>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <Svg width={21} height={21} viewBox="0 0 21 21" style={styles.starImg}>
            <Path d={STAR_PATH} fill="#474D67" />
          </Svg>
          <View style={styles.heroCard}>
            <View style={styles.swooshClip} pointerEvents="none">
              <Svg width={345} height={260} viewBox="0 0 345 260" style={styles.cardSwoosh}>
                <Path
                  d="M336 48 C300 75 230 95 218 138 C210 175 228 190 250 210"
                  stroke="#D5E4F9"
                  strokeWidth={12}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            </View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onSlideEnd}
              style={styles.slider}
            >
              {SLIDES.map((slide) => (
                <View key={slide.title} style={[styles.slide, { width: slideWidth }]}>
                  <Text style={styles.heroTitle}>{slide.title}</Text>
                  <View style={styles.heroPill}>
                    <Text style={styles.heroPillText}>{slide.pill}</Text>
                  </View>
                  <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.dots}>
              {SLIDES.map((slide, i) => (
                <View key={slide.title} style={[styles.dot, i === page && styles.dotActive]} />
              ))}
            </View>

            {page === 0 && (
              <ApplemanSvg
                width={Math.round(162 * illusScale)}
                height={Math.round(173 * illusScale)}
                style={styles.heroImage}
              />
            )}
            {page === 1 && (
              <GirlWithPenSvg
                width={Math.round(130 * illusScale)}
                height={Math.round(166 * illusScale)}
                style={[styles.heroImage, styles.heroImageAlt]}
              />
            )}
            {page === 2 && (
              <AbcboySvg
                width={Math.round(160 * illusScale)}
                height={Math.round(191 * illusScale)}
                style={[styles.heroImage, styles.heroImageAlt, styles.heroImageBoy]}
              />
            )}
          </View>
        </View>

        <View style={styles.flexSpacer} />

        <TouchableOpacity 
          style={styles.primaryBtn} 
          activeOpacity={0.9} 
          onPress={() => handleAuth('signup')}
          disabled={!!isLoading}
        >
          {isLoading === 'signup' ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.primaryBtnText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryBtn} 
          activeOpacity={0.9} 
          onPress={() => handleAuth('login')}
          disabled={!!isLoading}
        >
          {isLoading === 'login' ? (
            <ActivityIndicator color={colors.navy} />
          ) : (
            <Text style={styles.secondaryBtnText}>Log in</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // flexGrow so buttons pin to the bottom but it still scrolls on short screens
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: 10,
    alignItems: 'center',
  },
  flexSpacer: {
    flex: 1,
    minHeight: 26,
  },
  // keep the SVG at native size, don't rescale it or the two strokes drift apart
  bgLine: {
    position: 'absolute',
    top: -60,
    left: '50%',
    marginLeft: -136,
  },
  logoWrap: {
    marginTop: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 87,
    height: 87,
    borderRadius: 43.5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 9.5,
    borderColor: '#F0F4F8',
  },
  brand: {
    fontSize: 24,
    fontFamily: fonts.medium,
    color: colors.navy,
    marginTop: spacing.xs,
    marginBottom: 6,
  },
  chipsWrap: {
    width: '100%',
    marginTop: spacing.sm,
  },
  featureChip: {
    borderRadius: 24,
    borderWidth: 3.5,
    borderColor: colors.white,
  },
  // cards are taller than they look — lower halves tuck behind the next layer
  chipPink: {
    width: '60%',
    maxWidth: 207,
    height: 124,
    backgroundColor: '#F2D1D0',
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 18,
    transform: [{ translateX: 16 }, { rotate: '-7.95deg' }],
  },
  chipLime: {
    width: '80%',
    maxWidth: 277,
    height: 159,
    backgroundColor: colors.lime,
    alignSelf: 'center',
    paddingLeft: 30,
    paddingTop: 24,
    marginTop: -62,
    transform: [{ translateX: -11 }, { rotate: '7.47deg' }],
  },
  chipText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  chipTextLime: {
    color: '#4C6B2B',
  },
  doodle: {
    position: 'absolute',
    right: 7,
    top: 10,
    width: 33,
    height: 31,
  },
  doodleImg: {
    position: 'absolute',
    left: 6.4,
    top: 2.4,
    width: 19.8,
    height: 26,
    transform: [{ rotate: '56.58deg' }],
  },
  heroWrap: {
    width: '100%',
    marginTop: -94,
    transform: [{ rotate: '-1.5deg' }],
  },
  starImg: {
    position: 'absolute',
    top: -12,
    left: 4,
    zIndex: 2,
  },
  // clip the swoosh to the card corners — the card can't clip since illustrations overflow it
  swooshClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.lg - 6,
    overflow: 'hidden',
  },
  cardSwoosh: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  heroCard: {
    width: '100%',
    minHeight: 250,
    backgroundColor: colors.cardBlue,
    borderRadius: radius.lg,
    borderWidth: 6,
    borderColor: colors.white,
  },
  slider: {
    borderRadius: radius.lg - 6,
  },
  slide: {
    padding: spacing.xl,
    paddingTop: spacing.xl,
    minHeight: 238,
  },
  heroTitle: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: colors.navy,
  },
  heroPill: {
    backgroundColor: colors.blue,
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 6,
  },
  heroPillText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
  },
  heroSubtitle: {
    color: colors.navy,
    opacity: 0.7,
    marginTop: spacing.md,
    width: '60%',
    lineHeight: 18,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  dots: {
    position: 'absolute',
    left: spacing.xl,
    bottom: 44,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.navy,
    opacity: 1,
  },
  // let the illustration hang past the card edges, like the design
  heroImage: {
    position: 'absolute',
    right: -9,
    bottom: -20,
  },
  heroImageAlt: {
    right: 14,
    bottom: -22,
  },
  heroImageBoy: {
    right: 2,
    bottom: -24,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.navy,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  secondaryBtn: {
    width: '100%',
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});
