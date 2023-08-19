import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import EventsList from '../components/lists/events-list';

type EventsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Events'>;
};

const EventsScreen: React.FC<EventsScreenProps> = () => {
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <EventsList />
      </View>
    </SafeAreaView>
  );
};

export default EventsScreen;
