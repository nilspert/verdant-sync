import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import defaultStyles from '../assets/themes/default-styles';
import ScreenTitle from '../components/common/screen-title';
import { Button } from 'react-native-paper';
import SettingsList from '../components/lists/settings-list';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

type SettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
};

export interface SettingsListItem {
  id: string;
  title: string;
  navPath: string;
}

const SETTINGS: SettingsListItem[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'User settings',
    navPath: 'UserSettings',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Authorized devices',
    navPath: 'AuthorizedDevices',
  },
];

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const handleOnNavigate = (navPath: string) => {
    navigation.navigate(navPath);
  };

  return (
    <SafeAreaView style={{ ...defaultStyles.screenContainer, ...styles.container }}>
      <ScreenTitle
        title={'Settings'}
        subtitle={'Manage your account and security with user settings and authorized devices'}
      />
      <SettingsList settingsListData={SETTINGS} onNavigate={handleOnNavigate} />

      <Button mode="contained" onPress={() => signOut(auth)}>
        Sign Out
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
