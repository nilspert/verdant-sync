import { DefaultTheme } from 'react-native-paper';

// Define theme used in app
export const theme = {
  ...DefaultTheme, // Use DefaultTheme from 'react-native-paper'
  colors: {
    ...DefaultTheme.colors, // Use colors from DefaultTheme
    primary: '#00C853', // Green
    primaryContainer: '#00A045', // Lighter Green (Primary Variant)
    accent: '#1A237E', // Deep Blue
    accentContainer: '#1A237E', // Lighter Deep Blue (Accent Variant)
  },
};
