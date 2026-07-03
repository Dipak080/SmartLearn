import React from 'react';
import { StatusBar, Text, TextInput, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// cap font scaling so huge device text settings don't wreck the layouts
type WithDefaultProps = { defaultProps?: { maxFontSizeMultiplier?: number } };
(Text as unknown as WithDefaultProps).defaultProps = {
  ...(Text as unknown as WithDefaultProps).defaultProps,
  maxFontSizeMultiplier: 1.2,
};
(TextInput as unknown as WithDefaultProps).defaultProps = {
  ...(TextInput as unknown as WithDefaultProps).defaultProps,
  maxFontSizeMultiplier: 1.2,
};

import { useAppTheme } from './src/theme';
import type { RootStackParamList } from './src/navigation/types';
import OnboardingScreen from './src/screens/OnboardingScreen';
import MainTabs from './src/navigation/MainTabs';
import LessonScreen from './src/screens/LessonScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  const { colors } = useAppTheme();
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.white}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
