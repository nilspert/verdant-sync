/**
 * File: helpers.tsx
 * Author: Joonas Nislin
 * Date: 14.8.2023
 * Description: This file contains utility functions that are used in application
 */

import { EMAIL_REGEX } from './regex';

// Function that tests if email is valid
export const isValidEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

// Converts epochTime to dd/mm/yyyy hh:MM:ss format
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

// Function for getting water tank level as percentages
// min max distance should be changed to match water tank
// Prototype used one liter measuring cup with a diameter of 12.5 cm
export const getWaterTankLevel = (distanceStr: string): string => {
  const distance = parseFloat(distanceStr);

  const sensorMinDistance = 2.6;
  const sensorMaxDistance = 12.5;

  let percentage = 100;

  if (!isNaN(distance)) {
    if (distance >= sensorMaxDistance) {
      percentage = 0;
    } else if (distance <= sensorMinDistance) {
      percentage = 100;
    } else {
      percentage = ((sensorMaxDistance - distance) / (sensorMaxDistance - sensorMinDistance)) * 100;
    }
  }

  return `${percentage.toFixed(0)} %`;
};

// Adds percentage sign to string
export const addPercentage = (valueStr: string): string => {
  return `${valueStr} %`;
};

// Adds unit hPa (hectopascal) in the end of string
export const addHpa = (valueStr: string): string => {
  return `${valueStr} hPa`;
};

// Gets brightness value based on string 0 - 1024
export const getBrightness = (valueStr: string): string => {
  const analogValue = parseInt(valueStr, 10);
  if (analogValue >= 900) {
    return 'Very Bright';
  } else if (analogValue >= 700) {
    return 'Bright';
  } else if (analogValue >= 500) {
    return 'Moderate';
  } else if (analogValue >= 300) {
    return 'Dim';
  } else {
    return 'Very Dim';
  }
};

// Gets soil moisture value based on string 0 - 1024
export const getSoilMoisture = (valueStr: string): string => {
  const analogValue = parseInt(valueStr, 10);
  if (analogValue >= 900) {
    return 'Very Dry';
  } else if (analogValue >= 750) {
    return 'Dry';
  } else if (analogValue >= 500) {
    return 'Optimal';
  } else if (analogValue >= 250) {
    return 'Wet';
  } else {
    return 'Very Wet';
  }
};

// Changes percentage string to float
export const percentageToFloat = (percentageString: string): number => {
  const trimmedString = percentageString.trim();

  if (trimmedString.endsWith('%')) {
    const numericValue = parseFloat(trimmedString);

    if (!isNaN(numericValue)) {
      return numericValue / 100.0;
    }
  }

  return 0;
};

// Changes value to percentage
export const getSoilMoistureLevel = (value: string, includeRemaining: boolean = false): string => {
  // minValue = optimal
  // maxValue = very dry
  const minValue = 500;
  const maxValue = 1024;
  const valueRange = maxValue - minValue;

  // Change value to float
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return 'Invalid Input';
  }

  // Calculate percentage between 0-100 based on received value, minValue and valueRange
  const percentage = ((numericValue - minValue) / valueRange) * 100;

  if (includeRemaining) {
    return percentage.toFixed(2) + '%';
  } else {
    const remainingPercentage = 100 - percentage;
    return remainingPercentage.toFixed(2) + '%';
  }
};

// Gets color based on percentage red = 0, green = 100
export const getColorBasedOnPercentage = (percentageString: string): string => {
  const percentage = parseFloat(percentageString);
  if (isNaN(percentage)) {
    return 'rgb(255, 0, 0)'; // Red
  }

  if (percentage >= 0 && percentage < 100) {
    // Calculate the color based on the percentage between red and green
    const redValue = 255 - (percentage / 100) * 255;
    const greenValue = (percentage / 100) * 255;
    return `rgb(${redValue.toFixed(0)}, ${greenValue.toFixed(0)}, 0)`;
  } else {
    return 'rgb(0, 255, 0)'; // Green
  }
};
