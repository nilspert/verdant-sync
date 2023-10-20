/**
 * File: auth-form.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for AuthForm.
 * This component is used to sign up and sign in user
 * Uses react-hook-form for form handling and validation
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { EMAIL_REGEX } from '../../utils/regex';
import AppTitle from '../common/app-title';
import CustomButton from '../common/custom-button';
import defaultStyles from '../../assets/themes/default-styles';

// AuthForm props
interface Props {
  buttonText: string;
  onSubmit: (data: FormData) => void;
}

// Form fields
export interface FormData {
  email: string;
  password: string;
}

// Component definition
const AuthForm = ({ buttonText, onSubmit }: Props) => {
  // Include react-hook-form methods
  const { control, handleSubmit, formState } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    onSubmit(data); // Submit form data
  };

  return (
    <View style={defaultStyles.form}>
      <AppTitle content="dark-content" />
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email address',
            },
          }}
          render={({ field }) => (
            <TextInput
              style={defaultStyles.input}
              label="Email"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {formState.errors.email?.message && (
          <Text style={defaultStyles.errorText}>{formState.errors.email?.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
          render={({ field }) => (
            <TextInput
              style={defaultStyles.input}
              label="Password"
              value={field.value}
              onChangeText={field.onChange}
              secureTextEntry
            />
          )}
        />
        {formState.errors.password?.message && (
          <Text style={defaultStyles.errorText}>{formState.errors.password?.message}</Text>
        )}
      </View>
      <CustomButton mode="contained" label={buttonText} onPress={handleSubmit(handleFormSubmit)} />
    </View>
  );
};

// AuthForm styles
const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    marginTop: 20,
  },
});

// Export AuthForm component
export default AuthForm;
