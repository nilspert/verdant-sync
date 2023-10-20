/**
 * File: default-styles.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains Default styles used in app.
 */

import { StyleSheet } from 'react-native';
import { theme } from './theme';

// Create defaultStyles style object with react-native StyleSheet
const defaultStyles = StyleSheet.create({
  // Screen related default styles
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  contentContainer: {
    flexGrow: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 20,
  },

  screenContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  subScreenContainer: {
    paddingHorizontal: 10,
  },

  // Form related default styles
  form: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },

  // List related styles
  highlightedLeftBorder: {
    borderLeftWidth: 6,
    borderLeftColor: theme.colors.primary,
  },
});

// Export defaultStyles
export default defaultStyles;
