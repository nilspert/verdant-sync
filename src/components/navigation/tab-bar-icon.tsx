import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export interface TabBarIconProps {
  iconName: 'sprout' | 'bell-badge' | 'cog';
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon = ({ iconName, focused, color, size }: TabBarIconProps) => {
  return <Icon name={focused ? iconName : `${iconName}-outline`} color={color} size={size} />;
};

export default TabBarIcon;
