import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event, Severity } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import { formatEpochTime } from '../../utils/helpers';
import { Ionicons as Icon } from '@expo/vector-icons';
import { decryptData } from '../../utils/crypto-utils';

interface EventItemProps {
  item: Event;
}

const iconMappings: Record<Severity, string> = {
  [Severity.INFO]: 'information-circle',
  [Severity.WARNING]: 'warning',
  [Severity.ERROR]: 'alert-circle',
};

const iconColors: Record<Severity, string> = {
  [Severity.INFO]: 'blue',
  [Severity.WARNING]: 'orange',
  [Severity.ERROR]: 'red',
};

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

export default React.memo(EventItem);
