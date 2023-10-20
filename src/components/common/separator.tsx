/**
 * File: separator.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for Separator.
 * Component that is used separate elements with a line
 * Can be shown vertically or horizontally
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

// Separator props
interface SeparatorProps {
  mode: 'vertical' | 'horizontal';
}

// Component definition
const Separator: React.FC<SeparatorProps> = ({ mode }) => {
  const style = mode === 'vertical' ? styles.verticalSeparator : styles.horizontalSeparator;
  return <View style={style} />;
};

// Separator styles
const styles = StyleSheet.create({
  verticalSeparator: {
    backgroundColor: '#000', // Color of the separator
    width: 2, // Width of the separator
    height: '100%', // Height of the separator
  },

  horizontalSeparator: {
    backgroundColor: '#eee', // Color of the separator
    width: '100%', // Width of the separator
    height: 2, // Height of the separator
  },
});

// Export Separator component
export default Separator;
