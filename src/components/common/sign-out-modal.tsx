import React from 'react';
import { Modal, Portal, Text } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import CustomButton from '../common/custom-button';
import { getAuth } from 'firebase/auth';
import { StyleSheet } from 'react-native';

interface Props {
  isVisible: boolean;
  hideModal: () => void;
}

const auth = getAuth();

export default function SignOutModal({ isVisible, hideModal }: Props) {
  const exitApp = () => {
    signOut(auth);
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
}

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
