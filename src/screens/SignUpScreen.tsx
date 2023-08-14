import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../themes/defaultStyles';
import AuthForm from '../components/AuthForm';

type SetError = null | string;

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = () => {
  const [error, setError] = useState<SetError>(null);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (apiError) {
      setError(`'Email/Password Sign-In Error': ${apiError}`);
      console.error('Email/Password Sign-In Error:', apiError);
    }
  };

  return (
    <View style={styles.container}>
      {!!error && (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <AuthForm title="Sign Up" buttonText="Sign Up" onSubmit={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
