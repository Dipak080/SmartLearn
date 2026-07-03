import React from 'react';

import LessonDetail from '../components/LessonDetail';
import type { RootStackScreenProps } from '../navigation/types';

type Props = RootStackScreenProps<'Lesson'>;

export default function LessonScreen({ navigation }: Props) {
  return <LessonDetail onBack={navigation.goBack} />;
}
