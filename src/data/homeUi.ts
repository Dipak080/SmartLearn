import type { NotificationIconName } from '../components/icons';

export const LANGUAGES = [
  { code: 'en', countryCode: 'GB', label: 'English' },
  { code: 'hi', countryCode: 'IN', label: 'हिन्दी' },
  { code: 'es', countryCode: 'ES', label: 'Español' },
  { code: 'fr', countryCode: 'FR', label: 'Français' },
] as const;

export type Language = (typeof LANGUAGES)[number];

export const NOTIFICATIONS: {
  id: string;
  icon: NotificationIconName;
  title: string;
  time: string;
}[] = [
  { id: '1', icon: 'streak', title: '3-day streak! Keep it up, Max', time: '2m ago' },
  { id: '2', icon: 'badge', title: 'Letters badge unlocked', time: '1h ago' },
  { id: '3', icon: 'lesson', title: 'New lesson "D for Dog" is ready', time: '3h ago' },
  { id: '4', icon: 'report', title: 'Weekly progress report available', time: '1d ago' },
];
