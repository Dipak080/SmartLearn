import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { radius, useAppTheme, type AppColors } from '../theme';
import { TabIcon, TabIconName } from '../components/icons';
import HomeScreen from '../screens/HomeScreen';
import LessonListScreen from '../screens/LessonListScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<string, TabIconName> = {
  Home: 'home',
  Lessons: 'book',
  Analytics: 'stats',
  Profile: 'profile',
};

function PillTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabButton, focused && styles.tabButtonActive]}
            onPress={onPress}
            activeOpacity={0.85}
          >
            <TabIcon
              name={TAB_ICONS[route.name]}
              color={focused ? colors.white : colors.textSecondary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const renderTabBar = (props: BottomTabBarProps) => <PillTabBar {...props} />;

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lessons" component={LessonListScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    elevation: 12,
    shadowColor: colors.navy,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  tabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.screenBg,
  },
  tabButtonActive: {
    backgroundColor: colors.navy,
  },
});
