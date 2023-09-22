import React from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { Board } from '../../types/types';
import DecryptedText from '../../components/common/decrypted-text';
import Separator from '../../components/common/separator';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { theme } from '../../assets/themes/theme';
import { addHpa, addPercentage, getBrightness, getSoilMoisture } from '../../utils/helpers';

const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 240;
const scrollViewHeight = windowHeight - eventListHeaderHeight;

interface BoardInfoProps {
  filteredBoard: Board;
}

const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

const BoardInfo: React.FC<BoardInfoProps> = ({ filteredBoard }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconItemValue}>60 %</Text>
            </View>
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Water tank level</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <DecryptedText
                style={styles.iconItemValue}
                formatter={getSoilMoisture}
                encryptedHex={String(filteredBoard?.soil_moisture)}
              />
            </View>
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Soil moisture</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <DecryptedText
              style={styles.iconItemValue}
              formatter={getBrightness}
              encryptedHex={String(filteredBoard?.luminosity)}
            />
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Luminosity</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <DecryptedText
                style={styles.iconItemValue}
                encryptedHex={String(filteredBoard?.temperature)}
              />
              <Icon name={'temperature-celsius'} color={theme.colors.primary} size={36} />
            </View>
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Air temperature</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <DecryptedText
                style={styles.iconItemValue}
                formatter={addPercentage}
                encryptedHex={String(filteredBoard?.humidity)}
              />
            </View>
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Air humidity</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <DecryptedText
                style={styles.iconItemValue}
                formatter={addHpa}
                encryptedHex={String(filteredBoard?.air_pressure)}
              />
            </View>
            {RenderSeparator()}
            <Text style={styles.itemLabel}>Air pressure</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
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
  scrollView: {
    height: scrollViewHeight,
  },
});

export default BoardInfo;
