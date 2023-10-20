/**
 * File: app-title.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for AppTitle.
 * App title component is used in navigation bar, auth form and welcome screen
 * Displays app title and sprout icon
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { theme } from '../../assets/themes/theme';

// AppTitle props
interface AppTitleProps {
  content: 'light-content' | 'dark-content';
}

// Component definition
const AppTitle: React.FC<AppTitleProps> = ({ content }) => {
  const color = content === 'light-content' ? '#ffffff' : theme.colors.primary;
  return (
    <View style={styles.container}>
      <Icon name={'sprout-outline'} color={color} size={24} />
      <Text style={{ ...styles.text, color: color }}>VerdantSync</Text>
    </View>
  );
};

// AppTitle styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// Export AppTitle component
export default AppTitle;
