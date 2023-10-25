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

export const valueToPercentage = (value: string, includeRemaining: boolean = false): string => {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return 'Invalid Input';
  }

  if (numericValue < 0) {
    value = '0';
  } else if (numericValue > 1024) {
    value = '1024';
  }

  const percentage = (numericValue / 1024) * 100;

  if (includeRemaining) {
    return percentage.toFixed(2) + '%';
  } else {
    const remainingPercentage = 100 - percentage;
    return remainingPercentage.toFixed(2) + '%';
  }
};

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
