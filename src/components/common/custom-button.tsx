/**
 * File: custom-button.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for CustomButton.
 * Custom button component that has app styles
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../../assets/themes/theme';

// CustomButton props
interface CustomButtonProps {
  mode: 'contained' | 'outlined' | 'contained-tonal';
  onPress: () => void;
  label: string;
}

// Component definition
const CustomButton: React.FC<CustomButtonProps> = ({ mode, onPress, label }) => {
  const buttonStyle = mode === 'contained' ? styles.button : styles.outlinedButton;

  return (
    <Button style={buttonStyle} mode={mode} onPress={onPress}>
      {label}
    </Button>
  );
};

// CustomButton styles
const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    backgroundColor: theme.colors.primary,
  },

  outlinedButton: {
    marginVertical: 10,
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
});

// Export CustomButton component
export default CustomButton;
