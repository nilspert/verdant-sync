import React from 'react';
import { Text } from 'react-native';
import { decryptData } from '../utils/cryptoUtils'; // Import your decryption function

interface Props {
    encryptedHex: string
}

const DecryptedText = ({encryptedHex}: Props) => {
  const decryptedText = decryptData(encryptedHex);
  return <Text>{decryptedText}</Text>;
};

export default DecryptedText;
