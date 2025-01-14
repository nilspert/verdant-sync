/**
 * File: screen-title.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for ScreenTitle.
 * Component that is used to display title of the view
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// ScreenTitle props
interface Props {
  title: string;
  subtitle?: string;
}

// Component definition
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

// ScreenTitle styles
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

// Export ScreenTitle component
export default ScreenTitle;
