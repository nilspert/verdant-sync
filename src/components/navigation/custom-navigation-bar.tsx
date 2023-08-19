import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, useTheme, Modal, Portal, Text } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import CustomButton from '../common/custom-button';
import AppTitle from '../common/app-title';

const auth = getAuth();

export default function CustomNavigationBar({}: BottomTabHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const theme = useTheme(); // Access the theme

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const exitApp = () => {
    signOut(auth);
  };

  const renderTitle = () => <AppTitle content="light-content" />;

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.primary }]}>
      <Appbar.Content title={renderTitle()} />
      <Appbar.Action color="#FFFFFF" icon="exit-to-app" onPress={showModal} />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}
        >
          <Text style={styles.modalText}>Are you sure you want to quit?</Text>
          <CustomButton mode="contained" label="Yes" onPress={exitApp} />
          <CustomButton mode="outlined" label="Cancel" onPress={hideModal} />
        </Modal>
      </Portal>
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
