/**
 * File: info-message.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for InfoMessage.
 * Info message component that is used to display messages and info to user
 */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

// InfoMessage props
interface InfoMessageProps {
  message: string;
}

// Component definition
const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
  return <Text style={styles.infoText}>{message}</Text>;
};

// InfoMessage styles
const styles = StyleSheet.create({
  infoText: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});

// Export InfoMessage component
export default InfoMessage;
