import { colors } from '../theme';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import AbcboySvg from '../assets/abcboy.svg';
import LearncolorSvg from '../assets/learncolorobject.svg';

export type CategoryIcon = 'aa' | 'palette' | 'shapes';

export interface Category {
  key: string;
  label: string;
  count: string;
  icon?: CategoryIcon;
}

export interface Course {
  id: string;
  tag: string;
  title: string;
  lessons: string;
  time: string;
  bg: keyof typeof colors;
  illustration: React.FC<SvgProps>;
  icon: CategoryIcon;
}

export type LessonState = 'done' | 'current' | 'locked';

export interface Lesson {
  n: number;
  title: string;
  desc: string;
  descColor: string;
  time: string;
  timeBg: string;
  action: string;
  state: LessonState;
  bg: keyof typeof colors;
  faded?: boolean;
}

export const CATEGORIES: Category[] = [
  { key: 'all', label: 'All', count: '12' },
  { key: 'letters', label: 'Letters', count: '03', icon: 'aa' },
  { key: 'colors', label: 'Colors', count: '04', icon: 'palette' },
  { key: 'shapes', label: 'Shapes', count: '05', icon: 'shapes' },
];

export const COURSES: Course[] = [
  {
    id: 'colors',
    tag: 'Colors',
    title: 'Learn colors\nwith objects',
    lessons: '12 lessons',
    time: '10 min',
    bg: 'purpleSoft',
    illustration: LearncolorSvg,
    icon: 'palette',
  },
  {
    id: 'letters',
    tag: 'Letters',
    title: 'Learn ABC\nwith sounds',
    lessons: '26 lessons',
    time: '30 min',
    bg: 'limeSoft',
    illustration: AbcboySvg,
    icon: 'aa',
  },
];

export const LESSONS: Lesson[] = [
  {
    n: 1,
    title: 'A for Apple',
    desc: 'Learn the sound of A and objects that start with A',
    descColor: '#7B786B',
    time: '2 min',
    timeBg: '#F8F5E6',
    action: 'Replay',
    state: 'done',
    bg: 'cream',
  },
  {
    n: 2,
    title: 'B for Ball',
    desc: 'Recognize the letter B and its phonetic sound',
    descColor: '#807575',
    time: '3 min',
    timeBg: '#FFF1F1',
    action: 'Continue',
    state: 'current',
    bg: 'pinkSoft',
  },
  {
    n: 3,
    title: 'D for Dog',
    desc: 'Hear and repeat the D sound',
    descColor: '#6C757C',
    time: '5 min',
    timeBg: '#E6F2FB',
    action: 'Start Lesson',
    state: 'locked',
    bg: 'blueSoft',
  },
  {
    n: 4,
    title: 'C for Cat',
    desc: 'Learn the "C" sound with fun animations',
    descColor: '#968EA0',
    time: '10 min',
    timeBg: '#EFE0FF',
    action: 'Start Lesson',
    state: 'locked',
    bg: 'purpleSoft',
  },
  {
    n: 5,
    title: 'E for Elephant',
    desc: 'Learn the "E" sound with fun animations',
    descColor: '#CDCDCD',
    time: '10 min',
    timeBg: '#EFE0FF',
    action: 'Start Lesson',
    state: 'locked',
    bg: 'purpleSoft',
  },
];

export interface TodaysPick {
  title: string;
  lessons: string;
  time: string;
  /** Completion as a 0–1 fraction; drives both the ring and the % label. */
  progress: number;
}

export const TODAYS_PICK: TodaysPick = {
  title: 'Shapes',
  lessons: '12 lessons',
  time: '10 min',
  progress: 0.7,
};

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const SKILLS = ['Letters', 'Colors', 'Shapes', 'Animals'] as const;
export type Skill = (typeof SKILLS)[number];

export interface StreakData {
  current: number;
  goal: number;
  activeDays: boolean[];
  todayIndex: number;
}

export const STREAK: StreakData = {
  current: 3822,
  goal: 5000,
  activeDays: [true, true, true, false, false, false, false],
  todayIndex: 3,
};

export interface BarDatum {
  value: number;
  highlighted?: boolean;
}

export const SKILL_BARS: BarDatum[] = [
  { value: 0.55 },
  { value: 0.7 },
  { value: 0.62 },
  { value: 1, highlighted: true },
  { value: 0.72 },
  { value: 0.35 },
  { value: 0.78 },
];
