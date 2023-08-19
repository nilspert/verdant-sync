import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import defaultStyles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import UserSettingsForm, { type FormData } from '../components/forms/user-settings-form';
import useAuthentication, { UserSettings } from '../hooks/use-authentication';
import { updateInDatabase } from '../services/firebase-utils';
import { encryptData } from '../utils/crypto-utils';
import InfoMessage from '../components/common/info-message';

type UserSettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UserSettings'>;
};

const UserSettingsScreen: React.FC<UserSettingsScreenProps> = () => {
  const { user, settings } = useAuthentication();

  const onSubmit = async (data: FormData) => {
    try {
      if (user == null) {
        return;
      }
      // Assuming you have a reference to the user's settings node in Firebase
      const userSettingsPath = `/users/${user.uid}/settings`; // Update this to the actual path
      const updates = { ssid: encryptData(data.ssid) };

      updateInDatabase(userSettingsPath, updates);
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={defaultStyles.subScreenContainer}>
        <InfoMessage message="Define the SSID being used by the devices in your network environment" />
        <ScrollView>
          <UserSettingsForm settings={settings || ({} as UserSettings)} onSubmit={onSubmit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserSettingsScreen;
