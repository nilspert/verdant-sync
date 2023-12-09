/**
 * File: tab-bar-label.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for TabBarLabel.
 * This component is used to display expo vector icon in tab bar
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TabBarLabel props
export interface TabBarLabelProps {
  color: string;
  focused: boolean;
  label: string;
}

// Component definition
const TabBarLabel = ({ color, focused, label }: TabBarLabelProps) => {
  return (
    <View>
      {focused ? (
        <Text style={[{ color }, focused ? styles.boldText : styles.normalText]}>{label}</Text>
      ) : null}
    </View>
  );
};

// TabBarLabel styles
const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
  },
});

// Export TabBarLabel component
export default TabBarLabel;
