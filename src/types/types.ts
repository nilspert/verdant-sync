/**
 * File: firebase-utils.tsx
 * Author: Joonas Nislin
 * Date: 18.8.2023
 * Description: This file contains type definitions used in application
 */
import { ParamListBase } from '@react-navigation/native';

export interface Device {
  name: string;
  firmware: string;
  ip: string;
  ssid: string;
  temperature: string;
  soil_moisture: string;
  air_pressure: string;
  humidity: string;
  macAddress: string;
  luminosity: string;
  water_tank_level: string;
  latest_watering_time: string;
  latest_sensor_reading_time: string;
}

export interface AuthorizedDevice {
  authorized: boolean;
  ssid: string;
  macAddress: string;
  name: string;
}

export interface Event {
  timestamp: string; // The timestamp when the event occurred
  hostname: string; // The name of the host generating the event
  severity: string; // The severity level of the event (e.g., "INFO", "ERROR", "WARNING")
  facility: string; // The facility that generated the event (e.g., "AUTH", "USER")
  message: string; // The main message or description of the event
  messageId: string; // A unique identifier for the event
  ssid: string; // Identifier for the network
}

export interface RootStackParamList extends ParamListBase {}

export enum Severity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}
