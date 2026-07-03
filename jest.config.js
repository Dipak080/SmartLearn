module.exports = {
  preset: '@react-native/jest-preset',
  // react-navigation and friends ship ES modules; let Babel transpile them
  // instead of Jest choking on `export` (default preset ignores node_modules).
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|@react-navigation|react-native-svg|react-native-safe-area-context|react-native-screens|react-native-country-flag)/)',
  ],
};
