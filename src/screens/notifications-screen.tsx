import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import { Text } from 'react-native-paper';

type NotificationsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Events'>;
};

const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <Text>Notifications</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
