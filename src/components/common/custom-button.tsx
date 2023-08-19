import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../../assets/themes/theme';

interface CustomButtonProps {
  mode: 'contained' | 'outlined' | 'contained-tonal';
  onPress: () => void;
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ mode, onPress, label }) => {
  const buttonStyle = mode === 'contained' ? styles.button : styles.outlinedButton;

  return (
    <Button style={buttonStyle} mode={mode} onPress={onPress}>
      {label}
    </Button>
  );
};

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

export default CustomButton;
