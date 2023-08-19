import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

const ScreenTitle = ({ title, subtitle }: Props) => {
  return (
    <View>
      {subtitle != null ? (
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});

export default ScreenTitle;
