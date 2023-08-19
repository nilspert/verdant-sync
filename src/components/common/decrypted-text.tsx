import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { decryptData } from '../../utils/crypto-utils';

interface Props {
  encryptedHex: string;
  formatter?: (data: string) => string; // Optional formatter function
  style?: StyleProp<TextStyle>;
}

const DecryptedText = ({ encryptedHex, formatter, style }: Props) => {
  let decryptedText = decryptData(encryptedHex);

  if (formatter) {
    decryptedText = formatter(String(decryptedText)); // Apply the formatter if provided
  }

  return <Text style={style}>{decryptedText}</Text>;
};

export default DecryptedText;
