import CryptoES from 'crypto-es'; // Import the library
// Convert hexadecimal string to byte array
const encryptionKeyHex = String(process.env.ENCRYPTION_SECRET_KEY);
const encryptionKey = CryptoES.enc.Hex.parse(encryptionKeyHex);

const encryptionKeyIVHex = String(process.env.ENCRYPTION_SECRET_KEY_IV);
const encryptionKeyIV = CryptoES.enc.Hex.parse(encryptionKeyIVHex);

export function decryptData(encryptedData: string) {
    const ciphertext = CryptoES.enc.Hex.parse(encryptedData)
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
