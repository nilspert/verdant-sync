/**
 * File: user-settings-form.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for UserSettingsForm.
 * This component is used to save user settings to database
 * Uses react-hook-form for form handling and validation
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { SSID_REGEX } from '../../utils/regex';
import { UserSettings } from '../../hooks/use-authentication';
import { decryptData } from '../../utils/crypto-utils';
import CustomButton from '../common/custom-button';
import defaultStyles from '../../assets/themes/default-styles';

// UserSettingsForm props
interface UserSettingsFormProps {
  settings: UserSettings;
  onSubmit: (data: FormData) => void;
}

// Form fields
export interface FormData {
  ssid: string;
}

// Component definition
const UserSettingsForm: React.FC<UserSettingsFormProps> = ({ settings, onSubmit }) => {
  // Include react-hook-form methods
  const { control, handleSubmit, formState, setValue } = useForm<FormData>();

  // State that controls form editMode
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Set default value to the form if its present
    const getDefaultValue = (key: string) => {
      if (settings != null) {
        const value = settings[key as keyof UserSettings];
        return (value && decryptData(value)) || '';
      }
      return '';
    };

    if (settings != null) {
      setValue('ssid', getDefaultValue('ssid'));
    }
  }, [settings, setValue]);

  // Switches form editMode
  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  return (
    <View style={defaultStyles.contentContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="SSID"
            value={value}
            onChangeText={(text) => onChange(text)}
            error={formState.errors.ssid ? true : false}
            style={[defaultStyles.input, isEditMode && styles.editInput]}
            editable={isEditMode} // Editable when in edit mode
          />
        )}
        name="ssid"
        rules={{
          required: 'SSID is required',
          pattern: {
            value: SSID_REGEX,
            message: 'SSID must contain only letters, numbers, hyphens, and underscores',
          },
          minLength: { value: 6, message: 'SSID must be at least 6 characters long' },
          maxLength: { value: 32, message: 'SSID cannot exceed 32 characters' },
        }}
      />

      {formState.errors.ssid && (
        <Text style={defaultStyles.errorText}>{formState.errors.ssid.message}</Text>
      )}

      {isEditMode ? (
        <View>
          <CustomButton
            mode="contained"
            label="Save"
            onPress={handleSubmit((data) => {
              onSubmit(data);
              toggleEditMode();
            })}
          />
          <CustomButton mode="outlined" label="Cancel" onPress={toggleEditMode} />
        </View>
      ) : (
        <CustomButton mode="contained" label="Edit" onPress={toggleEditMode} />
      )}
    </View>
  );
};

// UserSettingsForm styles
const styles = StyleSheet.create({
  editInput: {
    backgroundColor: '#ffffff',
  },
});

// Export UserSettingsForm component
export default UserSettingsForm;
