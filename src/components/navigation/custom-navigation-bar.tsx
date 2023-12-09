/**
 * File: custom-navigation-bar.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for CustomNavigationBar.
 * This component is used to display navigation bar on main views (Devices & Settings)
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import AppTitle from '../common/app-title';
import { StackHeaderProps } from '@react-navigation/stack';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import SignOutModal from '../common/sign-out-modal';
import { useModal } from '../../hooks/use-modal';

// Function for rendering AppTitle component
const renderTitle = () => <AppTitle content="light-content" />;

// Component definition
export default function CustomNavigationBar({}: StackHeaderProps | BottomTabHeaderProps) {
  // Access the theme
  const theme = useTheme();
  // Call useModal hook
  const { isVisible, showModal, hideModal } = useModal();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.primary }]}>
      <Appbar.Content title={renderTitle()} />
      <Appbar.Action color="#FFFFFF" icon="exit-to-app" onPress={showModal} />
      <SignOutModal isVisible={isVisible} hideModal={hideModal} />
    </Appbar.Header>
  );
}

// CustomNavigationBar styles
const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
});
