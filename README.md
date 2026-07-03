# SmartLearn

A kids' learning app built from a Figma design with React Native (bare workflow) and TypeScript. Runs on both iOS and Android.

**Stack:** React Native 0.86 · TypeScript · React Navigation · react-native-svg

## Screens

- **Onboarding** – logo, floating feature cards, a swipeable "Personalized Learning" hero, Sign up / Log in
- **Home** – greeting header, language switcher, AI-buddy "Today's pick" card, category filters, scrollable course cards
- **Lesson** – lime hero with a progress ring and a vertical lesson timeline (done / current / locked / preview states)
- **Analytics** – weekly streak tracker, dismissible tip, skill filters, and a hatched bar chart
- **Profile** – profile card + log out

## Screenshots

Full-resolution captures live in [`screenshot/`](screenshot) — one folder per platform.

### iOS

| Onboarding | Home | Lesson |
|---|---|---|
| ![Onboarding](screenshot/ios/Onboarding%20Screen.jpeg) | ![Home](screenshot/ios/Home%20Screen1.jpeg) | ![Lesson](screenshot/ios/Lesson%20Screen.jpeg) |

| Analytics | Profile |
|---|---|
| ![Analytics](screenshot/ios/Analytics%20Screen.jpeg) | ![Profile](screenshot/ios/Profile%20Screen.jpeg) |

### Android

| Onboarding | Home | Lesson |
|---|---|---|
| ![Onboarding](screenshot/Android/Onboarding%20Screen.jpeg) | ![Home](screenshot/Android/Home%20Screen1.jpeg) | ![Lesson](screenshot/Android/Lesson%20Screen.jpeg) |

| Analytics | Profile |
|---|---|
| ![Analytics](screenshot/Android/Analytics%20Screen.jpeg) | ![Profile](screenshot/Android/Profile%20Screen.jpeg) |

## Getting started

You'll need a working React Native environment. If you don't have one yet, follow the official
[environment setup guide](https://reactnative.dev/docs/set-up-your-environment) (bare workflow) first —
Android Studio + SDK for Android, and Xcode + CocoaPods for iOS (macOS only).

Requirements:

- Node **22.11+**
- JDK 17 and Android SDK (for Android)
- Xcode 15+ and CocoaPods (for iOS, macOS only)

### 1. Install dependencies

```bash
npm install
```

### 2. Run it

**Android** (device or emulator running):

```bash
npm run android
```

**iOS** (macOS only):

```bash
cd ios && pod install && cd ..
npm run ios
```

Metro starts automatically. If it doesn't, run `npm start` in a separate terminal.

## Project structure

```
src/
  assets/        illustrations (PNG/SVG) and the Inter font files
  components/    reusable pieces – AiBuddyBanner, PlayButton, MetaChip, SelectableChip, LessonDetail, icons
  data/          typed mock data and domain models (Course, Lesson, StreakData, …)
  navigation/    bottom-tab bar + typed route params
  screens/       one file per screen
  theme/         colors, spacing, radius and font tokens (light + dark)
App.tsx          root navigator (Onboarding → Tabs → Lesson)
```

## Notes

- **Bare workflow** was chosen over Expo so the native font linking and platform folders are set up properly.
- **Fonts** – Inter / Inter Display are bundled and linked on both platforms. They're applied with `fontFamily` (not `fontWeight`) so Android renders the right weights.
- **Styling** – everything goes through `StyleSheet` with shared tokens from `src/theme`; no inline styles and no hard-coded colors in the screens.
- **Navigation** – native stack for the top-level flow, bottom tabs for the four main sections. Route params are fully typed.
- **State** – local component state only. The app is presentational, so a global store would be overkill here.
- **Dark mode** – the whole app (screens and chrome) responds to the system color scheme.
- **Lesson states** – done, current, locked and the faded preview row are all handled.

## Scripts

| Command | What it does |
|---|---|
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm start` | Start the Metro bundler |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Jest tests |
