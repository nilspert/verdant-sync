/**
 * File: tab-bar-icon.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for TabBarIcon.
 * This component is used to display expo vector icon in tab bar
 */
import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export interface TabBarIconProps {
  iconName: 'sprout' | 'bell-badge' | 'cog';
  focused: boolean;
  color: string;
  size: number;
}

// Component definition
export const TabBarIcon = ({ iconName, focused, color, size }: TabBarIconProps) => {
  return <Icon name={focused ? iconName : `${iconName}-outline`} color={color} size={size} />;
};
