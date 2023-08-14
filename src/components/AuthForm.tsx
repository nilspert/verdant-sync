// components/AuthForm.js

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from '../themes/defaultStyles';
import { isValidEmail } from '../utils/helpers';

interface Props {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm = ({ title, buttonText, onSubmit }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = () => {
    if (!email || !password) {
      setError('Email and password are mandatory.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');
    onSubmit(email, password);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{title}</Text>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput style={styles.input} label="Email" value={email} onChangeText={setEmail} />

      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button mode="contained" onPress={handleFormSubmit}>
        {buttonText}
      </Button>
    </View>
  );
};

export default AuthForm;
