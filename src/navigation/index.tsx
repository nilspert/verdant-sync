import React from 'react';
import { StatusBar } from 'react-native';
import useAuthentication from '../hooks/use-authentication';
import AuthStack from './auth-stack';
import AppNavigator from './app-navigator';
import { theme } from '../assets/themes/theme';

export default function RootNavigation() {
  const { user } = useAuthentication();

  // Customize StatusBar properties here
  if (user) {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(theme.colors.primary); // Set the background color
  } else {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#ffffff'); // Set the background color
  }

  return user ? <AppNavigator /> : <AuthStack />;
}
