import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Board } from '../../types/types';
import { theme } from '../../assets/themes/theme';
import {
  addHpa,
  addPercentage,
  getBrightness,
  getSoilMoisture,
  getWaterTankLevel,
} from '../../utils/helpers';
import BoardInfoItem from './board-info-item';

const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 190;
const scrollViewHeight = windowHeight - eventListHeaderHeight;

interface Props {
  filteredBoard: Board;
}

interface RowProps {
  children: ReactNode;
}

const RenderRow = ({ children }: RowProps) => {
  return <View style={styles.row}>{children}</View>;
};

const BoardInfo: React.FC<Props> = ({ filteredBoard }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <RenderRow>
        <BoardInfoItem
          boardProperty={String(filteredBoard?.water_tank_level)}
          propertyLabel="Water tank level"
          formatter={getWaterTankLevel}
        />
        <BoardInfoItem
          boardProperty={String(filteredBoard?.soil_moisture)}
          propertyLabel="Soil moisture"
          formatter={getSoilMoisture}
        />
      </RenderRow>
      <RenderRow>
        <BoardInfoItem
          boardProperty={String(filteredBoard?.luminosity)}
          propertyLabel="Luminosity"
          formatter={getBrightness}
        />
      </RenderRow>
      <RenderRow>
        <BoardInfoItem
          boardProperty={String(filteredBoard?.temperature)}
          propertyLabel="Air temperature"
          iconName="temperature-celsius"
        />
        <BoardInfoItem
          boardProperty={String(filteredBoard?.humidity)}
          propertyLabel="Air humidity"
          formatter={addPercentage}
        />
      </RenderRow>
      <RenderRow>
        <BoardInfoItem
          boardProperty={String(filteredBoard?.air_pressure)}
          propertyLabel="Air pressure"
          formatter={addHpa}
        />
      </RenderRow>
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
  scrollView: {
    height: scrollViewHeight,
  },
});

export default BoardInfo;
