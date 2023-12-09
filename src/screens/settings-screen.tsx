/**
 * File: settings-screen.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for SettingsScreen.
 * UI component for Settings view
 */
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import defaultStyles from '../assets/themes/default-styles';
import ScreenTitle from '../components/common/screen-title';
import { Button } from 'react-native-paper';
import SettingsList from '../components/lists/settings-list';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useModal } from '../hooks/use-modal';
import SignOutModal from '../components/common/sign-out-modal';
import useAuthentication from '../hooks/use-authentication';

// SettingsScreen props
type SettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

// Type definition for SettingsListItem
export interface SettingsListItem {
  id: string;
  title: string;
  navPath: string;
}

// Sub views for settings
const SETTINGS: SettingsListItem[] = [
  {
    id: '0',
    title: 'User settings',
    navPath: 'UserSettings',
  },
  {
    id: '1',
    title: 'Authorized devices',
    navPath: 'AuthorizedDevices',
  },
];

// Component definition
const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { isVisible, showModal, hideModal } = useModal();
  const { user } = useAuthentication();

  // Function for handling navigation to sub views
  const handleOnNavigate = (navPath: string) => {
    navigation.navigate(navPath);
  };

  return (
    <SafeAreaView style={{ ...defaultStyles.screenContainer, ...styles.container }}>
      <ScreenTitle
        title={'Settings'}
        subtitle={'Manage your account and security with user settings and authorized devices'}
      />

      <Text style={styles.loggedInText}>Logged in as {user && user.email}</Text>

      <SettingsList settingsListData={SETTINGS} onNavigate={handleOnNavigate} />

      <Button mode="contained" onPress={showModal}>
        Sign Out <Icon color="#ffffff" size={14} name="exit-to-app" />
      </Button>

      <SignOutModal isVisible={isVisible} hideModal={hideModal} />
    </SafeAreaView>
  );
};

// Styles for SettingsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loggedInText: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

// Export SettingsScreen view
export default SettingsScreen;
