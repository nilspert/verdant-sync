import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SeparatorProps {
  mode: 'vertical' | 'horizontal';
}

const Separator: React.FC<SeparatorProps> = ({ mode }) => {
  const style = mode === 'vertical' ? styles.verticalSeparator : styles.horizontalSeparator;
  return <View style={style} />;
};

const styles = StyleSheet.create({
  verticalSeparator: {
    backgroundColor: '#000', // Color of the separator
    width: 2, // Width of the separator
    height: '100%', // Height of the separator
  },

  horizontalSeparator: {
    backgroundColor: '#eee', // Color of the separator
    width: '100%', // Width of the separator
    height: 2, // Height of the separator
  },
});

export default Separator;
