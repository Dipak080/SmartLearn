import React from 'react';

import LessonDetail from '../components/LessonDetail';
import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Lessons'>;

export default function LessonListScreen({ navigation }: Props) {
  return <LessonDetail onBack={() => navigation.navigate('Home')} insideTabs />;
}
