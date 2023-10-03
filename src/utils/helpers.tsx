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

export const addPercentage = (valueStr: string): string => {
  return `${valueStr} %`;
};

export const addHpa = (valueStr: string): string => {
  return `${valueStr} hPa`;
};

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

export const getSoilMoisture = (valueStr: string): string => {
  const analogValue = parseInt(valueStr, 10);
  if (analogValue >= 900) {
    return 'Very Dry';
  } else if (analogValue >= 700) {
    return 'Dry';
  } else if (analogValue >= 500) {
    return 'Moist';
  } else if (analogValue >= 300) {
    return 'Wet';
  } else {
    return 'Very Wet';
  }
};
