/**
 * File: loading-spinner.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for LoadingSpinner.
 * Component that displays ActivityIndicator to inform user that some process is taking some time to complete
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

// Component definition
const LoadingSpinner = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating color={theme.colors.primary} />
    </View>
  );
};

// LoadingSpinner styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export LoadingSpinner component
export default LoadingSpinner;
