import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import AppTitle from '../common/app-title';
import { StackHeaderProps } from '@react-navigation/stack';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import SignOutModal from '../common/sign-out-modal';
import { useModal } from '../../hooks/use-modal';

const renderTitle = () => <AppTitle content="light-content" />;

export default function CustomNavigationBar({}: StackHeaderProps | BottomTabHeaderProps) {
  const theme = useTheme(); // Access the theme
  const { isVisible, showModal, hideModal } = useModal();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.primary }]}>
      <Appbar.Content title={renderTitle()} />
      <Appbar.Action color="#FFFFFF" icon="exit-to-app" onPress={showModal} />
      <SignOutModal isVisible={isVisible} hideModal={hideModal} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 0, // Remove shadow
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
