/**
 * File: event-item.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for EventItem.
 * This component is used to display event that is sent from VerdantSync IoT device
 * Decrypts severity with decryptData from crypto-utils
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event, Severity } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import { formatEpochTime } from '../../utils/helpers';
import { Ionicons as Icon } from '@expo/vector-icons';
import { decryptData } from '../../utils/crypto-utils';

// EventItem props
interface EventItemProps {
  item: Event;
}

// IconMappings used to display correct icon matching severity of event
const iconMappings: Record<Severity, string> = {
  [Severity.INFO]: 'information-circle',
  [Severity.WARNING]: 'warning',
  [Severity.ERROR]: 'alert-circle',
};

// IconColors used to display correct color matching severity of event
const iconColors: Record<Severity, string> = {
  [Severity.INFO]: 'blue',
  [Severity.WARNING]: 'orange',
  [Severity.ERROR]: 'red',
};

// Function used to render icon by severity
const RenderIconBySeverity = ({ severity }: { severity: string }) => {
  const decryptedSeverity = decryptData(severity);
  const name: any = iconMappings[decryptedSeverity as Severity] || 'information-circle';
  const color: string = iconColors[decryptedSeverity as Severity] || 'blue';
  return (
    <View>
      <Icon name={name} color={color} size={24} />
    </View>
  );
};

// Component definition
const EventItem: React.FC<EventItemProps> = ({ item }) => {
  return (
    <View style={styles.eventContainer}>
      <View style={styles.eventDetails}>
        <Text style={styles.timestamp}>{formatEpochTime(item.timestamp)}</Text>
        <View style={styles.eventDetailsContainer}>
          <RenderIconBySeverity severity={item.severity} />
          <View>
            <DecryptedText style={styles.eventInfo} encryptedHex={String(item.hostname) || ''} />
            <DecryptedText style={styles.eventInfo} encryptedHex={String(item.message) || ''} />
          </View>
        </View>
      </View>
    </View>
  );
};

// EventItem styles
const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  eventDetails: {
    flexDirection: 'column',
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333333',
  },
  eventDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// Export EventItem as memoized component to reduce extra rendering
export default React.memo(EventItem);
