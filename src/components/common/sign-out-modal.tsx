/**
 * File: sign-out-modal.tsx
 * Author: Joonas Nislin
 * Date: 8.10.2023
 * Description: This file contains component definition for SignOutModal.
 * When user wants to logout, this modal is displayed to verify the action
 */

import React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import CustomButton from '../common/custom-button';
import { getAuth } from 'firebase/auth';
import { StyleSheet } from 'react-native';

// SignOutModal props
interface Props {
  isVisible: boolean;
  hideModal: () => void;
}

// Get current firebase authentication instance
const auth = getAuth();

// Component definition
const SignOutModal = ({ isVisible, hideModal }: Props) => {
  const exitApp = () => {
    signOut(auth); // Sign out current user
  };

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure you want to quit?</Text>
        <CustomButton mode="contained" label="Yes" onPress={exitApp} />
        <CustomButton mode="outlined" label="Cancel" onPress={hideModal} />
      </Modal>
    </Portal>
  );
};

// SignOutModal styles
const styles = StyleSheet.create({
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

// Export SignOutModal component
export default SignOutModal;
