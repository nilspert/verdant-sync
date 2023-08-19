import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { theme } from '../../assets/themes/theme';

interface AppTitleProps {
  content: 'light-content' | 'dark-content';
}

const AppTitle: React.FC<AppTitleProps> = ({ content }) => {
  const color = content === 'light-content' ? '#ffffff' : theme.colors.primary;
  return (
    <View style={styles.container}>
      <Icon name={'sprout-outline'} color={color} size={24} />
      <Text style={{ ...styles.text, color: color }}>VerdantSync</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppTitle;
