import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth';
import styles from '../assets/themes/default-styles';
import AuthForm, { FormData } from '../components/forms/auth-form';
import Toast from '../components/common/toast';

const auth = getAuth();

type SignUpScreenProps = StackScreenProps<any, 'SignUp'>;

const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  const handleSignUp = async (formData: FormData) => {
    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      Toast({ message: 'User created successfully' });
    } catch (apiError) {
      const errorObject = apiError as AuthError; // Cast to AuthError type
      let errorMessage = 'An error occurred while signing up.';

      // Handle specific error codes
      if (errorObject.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (errorObject.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (errorObject.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. It should be at least 6 characters.';
      }

      Toast({ message: errorMessage }); // Display error message using the Toast component

      console.error('Email/Password Sign-In Error:', apiError);
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm buttonText="Sign Up" onSubmit={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
