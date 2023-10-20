/**
 * File: event-list-header.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for EventListHeader.
 * This component is used to set filter for events that are being viewed.
 * Filters include date and severity
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Severity } from '../../types/types';
import Separator from '../common/separator';
import { theme } from '../../assets/themes/theme';

// EventListHeader props
interface EventListHeaderProps {
  filterSeverity: Severity | null;
  setFilterSeverity: React.Dispatch<React.SetStateAction<Severity>>;
  eventsLength: number;
  selectedDate: Date;
  handleDateNavigation: (daysToAdd: number) => void;
}

// Component definition
const EventListHeader: React.FC<EventListHeaderProps> = ({
  filterSeverity,
  setFilterSeverity,
  eventsLength,
  selectedDate,
  handleDateNavigation,
}) => {
  const disableForward = selectedDate.getDate() >= new Date().getDate(); // Disable future date filters
  return (
    <View>
      <View style={styles.dateNavigationContainer}>
        <Button onPress={() => handleDateNavigation(-1)}>
          <Icon name="arrow-back" size={24} color="black" />
        </Button>
        <Text>{selectedDate.toDateString()}</Text>
        <Button disabled={disableForward} onPress={() => handleDateNavigation(1)}>
          <Icon name="arrow-forward" size={24} color={disableForward ? '#ccc' : '#000'} />
        </Button>
      </View>

      <View style={styles.filterButtonsContainer}>
        {Object.values(Severity).map((severity) => (
          <Button
            key={severity}
            style={[filterSeverity === severity && styles.filterButtonActive]}
            onPress={() => setFilterSeverity(severity as Severity)}
          >
            <Text
              style={{
                ...styles.filterButtonText,
                ...(filterSeverity === severity ? styles.lightContent : styles.darkContent),
              }}
            >
              {severity}
            </Text>
          </Button>
        ))}
        <View>
          <Text>{eventsLength}</Text>
        </View>
      </View>
      <Separator mode="horizontal" />
    </View>
  );
};

// EventListHeader styles
const styles = StyleSheet.create({
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
  },
  filterButtonText: {
    fontSize: 14,
  },
  lightContent: {
    color: '#ffffff',
  },
  darkContent: {
    color: '#000000',
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

// Export EventListHeader component
export default EventListHeader;
