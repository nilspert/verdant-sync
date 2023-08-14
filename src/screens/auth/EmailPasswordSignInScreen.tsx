import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../themes/defaultStyles';
import AuthForm from '../../components/AuthForm';

const auth = getAuth();

type SetError = null | string;

const EmailPasswordSignInScreen = () => {
  const [error, setError] = useState<SetError>(null);

  const handleEmailPasswordSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      <AuthForm title="Sign In" buttonText="Sign In" onSubmit={handleEmailPasswordSignIn} />
    </View>
  );
};

export default EmailPasswordSignInScreen;
