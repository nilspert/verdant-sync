import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, signInAnonymously } from 'firebase/auth';
import defaultStyles from '../../themes/defaultStyles';

const auth = getAuth();

const AnonymousSignInScreen = () => {
  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Anonymous Sign-In Error:', error);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Anonymous Sign-In</Text>
      <Text style={defaultStyles.subtitle}>Sign in without creating an account</Text>
      <Button mode="contained" style={defaultStyles.button} onPress={handleAnonymousSignIn}>
        Sign In Anonymously
      </Button>
    </View>
  );
};

export default AnonymousSignInScreen;
