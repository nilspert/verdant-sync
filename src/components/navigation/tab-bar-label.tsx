import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TabBarLabelProps {
  color: string;
  focused: boolean;
  label: string;
}

const TabBarLabel = ({ color, focused, label }: TabBarLabelProps) => {
  return (
    <View>
      {focused ? (
        <Text style={[{ color }, focused ? styles.boldText : styles.normalText]}>{label}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
  },
});

export default TabBarLabel;
