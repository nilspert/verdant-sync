import { EMAIL_REGEX } from './regex';

export const isValidEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

export const formatEpochTime = (epochTime: string) => {
  const epochTimeInt = parseInt(epochTime, 10); // Convert the string to an integer
  const date = new Date(epochTimeInt * 1000); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const calculatePercentage = (valueStr: string): string => {
  // Parse the input string to a number
  const value = parseFloat(valueStr);

  // Check if the value is within the valid range (0 - 1024)
  if (isNaN(value) || value < 0 || value > 1024) {
    throw new Error('Input value must be a number between 0 and 1024');
  }

  // Calculate the percentage
  const percentage = ((value / 1024) * 100).toFixed(2);

  return `${percentage} %`;
};

export const addPercentage = (valueStr: string): string => {
  return `${valueStr} %`;
};

export const addHpa = (valueStr: string): string => {
  return `${valueStr} hPa`;
};
