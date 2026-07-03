import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts, spacing, radius, useAppTheme, type AppColors } from '../theme';
import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Profile'>;

const bookSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`;
const awardSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
const shieldSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const gearSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
const chatSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;

interface ProfileRow {
  label: string;
  icon: string;
}

const ROWS: ProfileRow[] = [
  { label: 'My lessons', icon: bookSvg },
  { label: 'Achievements', icon: awardSvg },
  { label: 'Parental controls', icon: shieldSvg },
  { label: 'Settings', icon: gearSvg },
  { label: 'Help & support', icon: chatSvg },
];

export default function ProfileScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const styles = useStyles(colors);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.replace('Onboarding');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navyHeader} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.hero}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/avatar.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.name}>Max Johnson</Text>
        </View>

        <View style={styles.list}>
          {ROWS.map((row, i) => (
            <TouchableOpacity 
              key={row.label} 
              style={[styles.row, i < ROWS.length - 1 && styles.rowBorder]} 
              activeOpacity={0.7}
            >
              <View style={styles.iconWrap}>
                <SvgXml xml={row.icon.replace(/#1B2A4A/gi, colors.navy)} />
              </View>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconContainer}>
              <Text style={styles.modalIcon}>🚪</Text>
            </View>
            <Text style={styles.modalTitle}>Log out</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to log out? You will need to sign in again to access your progress.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                activeOpacity={0.7}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnConfirm]}
                activeOpacity={0.7}
                onPress={confirmLogout}
              >
                <Text style={styles.modalBtnConfirmText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const useStyles = (colors: AppColors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  content: {
    flexGrow: 1,
  },
  navyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 310,
    backgroundColor: colors.navy,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: colors.white,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.white,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.medium,
    color: colors.white,
    marginTop: spacing.lg,
  },
  list: {
    marginTop: 40,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 24,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 8,
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.screenBg,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rowLabel: {
    flex: 1,
    color: colors.navy,
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 24,
  },
  logout: {
    marginHorizontal: spacing.xl,
    marginTop: 'auto',
    marginBottom: 110,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.pinkSoft,
    backgroundColor: colors.white,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.pink,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 2,
  },
  logoutText: {
    color: colors.pink,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(27,42,74,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    width: '100%',
    maxWidth: 340,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 15,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.pinkSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalIcon: {
    fontSize: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: fonts.medium,
    color: colors.navy,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing.md,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    backgroundColor: colors.chipBg,
  },
  modalBtnCancelText: {
    color: colors.textPrimary,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  modalBtnConfirm: {
    backgroundColor: colors.pink,
  },
  modalBtnConfirmText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
});
