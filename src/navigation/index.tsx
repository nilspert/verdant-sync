/**
 * File: index.tsx
 * Author: Joonas Nislin
 * Date: 18.8.2023
 * Description: This file contains component definition for authStack.
 * Component that defines if AppNavigator or AuthStack is shown based on
 * if user is present in useAuthentication hook
 */
import React from 'react';
import { StatusBar } from 'react-native';
import useAuthentication from '../hooks/use-authentication';
import AuthStack from './auth-stack';
import AppNavigator from './app-navigator';
import { theme } from '../assets/themes/theme';

// Component definition and export for RootNavigation
export default function RootNavigation() {
  const { user } = useAuthentication();

  // Check if user has logged in and define StatusBar properties based on that
  if (user) {
    StatusBar.setBarStyle('light-content');
    // Set the background color to primary
    StatusBar.setBackgroundColor(theme.colors.primary);
  } else {
    StatusBar.setBarStyle('dark-content');
    // Set the background color to white
    StatusBar.setBackgroundColor('#ffffff');
  }

  // If user is found display AppNavigator else AuthStack
  return user ? <AppNavigator /> : <AuthStack />;
}
