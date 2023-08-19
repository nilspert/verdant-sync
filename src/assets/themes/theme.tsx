import { DefaultTheme } from 'react-native-paper';

// Define the primary and secondary colors
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00C853', // Green
    primaryContainer: '#00A045', // Lighter Green (Primary Variant)
    accent: '#1A237E', // Deep Blue
    accentContainer: '#1A237E', // Lighter Deep Blue (Accent Variant)
  },
};
