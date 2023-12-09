/**
 * File: welcome-screen.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for WelcomeScreen.
 * UI component for Welcome view, acts as "landing page" for the application
 */
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import defaultStyles from '../assets/themes/default-styles';
import CustomButton from '../components/common/custom-button';
import AppTitle from '../components/common/app-title';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppTitle content="dark-content" />
      <View style={styles.buttons}>
        <CustomButton
          mode="contained"
          label="Sign In"
          onPress={() => navigation.navigate('SignIn')}
        />
        <CustomButton
          mode="outlined"
          label="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...defaultStyles.container },
  buttons: {
    width: '100%',
    marginTop: 10,
  },
});

export default WelcomeScreen;
