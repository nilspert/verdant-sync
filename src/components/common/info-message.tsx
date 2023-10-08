import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
  return <Text style={styles.infoText}>{message}</Text>;
};

const styles = StyleSheet.create({
  infoText: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});

export default InfoMessage;
