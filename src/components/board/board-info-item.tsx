import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../assets/themes/theme';
import DecryptedText from '../common/decrypted-text';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Separator from '../common/separator';

// Add more icons from MaterialCommunityIcons if needed
type Icon = 'temperature-celsius';

// BoardInfoItem props
interface Props {
  boardProperty: string;
  propertyLabel: string;
  formatter?: (data: string) => string;
  iconName?: Icon;
}

// Function to return Separator component in horizantal mode
const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

// Component used in board-info.tsx for displaying Board properties eq. Temperature, Soil moisture, Water tank level
const BoardInfoItem: React.FC<Props> = ({
  boardProperty,
  propertyLabel,
  formatter,
  iconName,
}: Props) => {
  return (
    <View style={styles.column}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <DecryptedText
            style={styles.iconItemValue}
            formatter={formatter}
            encryptedHex={boardProperty}
          />
          {iconName && <Icon name={iconName} color={theme.colors.primary} size={36} />}
        </View>
        {RenderSeparator()}
        <Text style={styles.itemLabel}>{propertyLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    marginHorizontal: 8,
    borderRadius: 8,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  iconItemValue: {
    fontSize: 26,
    color: theme.colors.primaryContainer,
  },
  itemLabel: {
    marginTop: 5,
  },
});

// Export BoardInfoItem component
export default BoardInfoItem;
