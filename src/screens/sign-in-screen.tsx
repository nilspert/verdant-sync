import React from 'react';
import { View } from 'react-native';
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import styles from '../assets/themes/default-styles';
import AuthForm, { FormData } from '../components/forms/auth-form';
import Toast from '../components/common/toast'; // Import the Toast component
import { StackScreenProps } from '@react-navigation/stack';

const auth = getAuth();
type SignInScreenProps = StackScreenProps<any, 'SignIn'>;

const SignInScreen: React.FC<SignInScreenProps> = () => {
  const handleEmailPasswordSignIn = async ({ email, password }: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (apiError) {
      const errorObject = apiError as AuthError; // Cast to AuthError type
      let errorMessage = 'An error occurred while signing in.';

      // Handle specific error codes
      if (errorObject.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (errorObject.code === 'auth/user-disabled') {
        errorMessage = 'This user account has been disabled.';
      } else if (errorObject.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check the email and password.';
      } else if (errorObject.code === 'auth/wrong-password') {
        errorMessage = 'Email not found or invalid password. Please try again.';
      }

      Toast({ message: errorMessage }); // Display error message using the Toast component

      console.error('Email/Password Sign-In Error:', apiError);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm buttonText="Sign In" onSubmit={handleEmailPasswordSignIn} />
    </View>
  );
};

export default SignInScreen;