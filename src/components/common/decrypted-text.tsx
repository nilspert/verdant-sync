/**
 * File: decrypted-text.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for DecryptedText.
 * Custom text component that uses decryptData from crypto-utils to decrypt encryptedHex and display its content
 * String formatters can be applied to decryptedText
 */

import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { decryptData } from '../../utils/crypto-utils';

// DecryptedText props
interface Props {
  encryptedHex: string;
  formatter?: (data: string) => string; // Optional formatter function
  style?: StyleProp<TextStyle>;
}

// Component definition
const DecryptedText = ({ encryptedHex, formatter, style }: Props) => {
  let decryptedText = decryptData(encryptedHex);

  if (formatter) {
    decryptedText = formatter(String(decryptedText)); // Apply the formatter if provided
  }

  return <Text style={style}>{decryptedText}</Text>;
};

// Export DecryptedText component
export default DecryptedText;
