/**
 * File: crypto-utils.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains utility functions for decrypting and encrypting data.
 * Based on CryptoES examples
 * DecryptData
 * - Decrypts fetched data to user readable format
 * EncryptData
 * - Encrypts data to hexadecimal string representation for database storage.
 * - Not in user readable format
 * UI component for SignUp view
 */

// Import the CryptoES library for cryptographic operations
import CryptoES from 'crypto-es';

// Convert hexadecimal string to byte array for encryption key
const encryptionKeyHex = String(process.env.ENCRYPTION_SECRET_KEY);
const encryptionKey = CryptoES.enc.Hex.parse(encryptionKeyHex);

// Convert hexadecimal string to byte array for encryption key initialization vector (IV)
const encryptionKeyIVHex = String(process.env.ENCRYPTION_SECRET_KEY_IV);
const encryptionKeyIV = CryptoES.enc.Hex.parse(encryptionKeyIVHex);

// Decrypts the given encrypted data using AES encryption with the configured key and IV.
export function decryptData(encryptedData: string): string | null {
  const ciphertext = CryptoES.enc.Hex.parse(encryptedData);
  try {
    const decryptedBytes = CryptoES.AES.decrypt({ ciphertext }, encryptionKey, {
      iv: encryptionKeyIV,
    });
    try {
      return decryptedBytes.toString(CryptoES.enc.Utf8);
    } catch (utfError) {
      console.error('UTF-8 Decoding Error:', utfError);
      return null;
    }
  } catch (error) {
    console.error('Decryption Error:', error);
    return null;
  }
}

// Encrypts the given data using AES encryption with the configured key and IV.
export function encryptData(data: string) {
  const plaintext = CryptoES.enc.Utf8.parse(data);
  try {
    const encryptedBytes = CryptoES.AES.encrypt(plaintext, encryptionKey, {
      iv: encryptionKeyIV,
    });
    try {
      return encryptedBytes.ciphertext?.toString().toUpperCase();
    } catch (toStringError) {
      console.error('Encryption to String Error:', toStringError);
      return null;
    }
  } catch (error) {
    console.error('Encryption Error:', error);
    return null;
  }
}
