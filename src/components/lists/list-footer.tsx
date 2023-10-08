import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LoadingSpinner from '../common/loading-spinner';
import Separator from '../common/separator';

interface InfoMessageProps {
  loading: boolean;
  showEndReached: boolean;
}

const ListFooter: React.FC<InfoMessageProps> = ({ loading, showEndReached }) => {
  return loading ? (
    <LoadingSpinner />
  ) : (
    <View>
      {showEndReached && (
        <View>
          <Separator mode="horizontal" />
          <Text style={styles.endReached}>You have reached the end, my beautiful friend</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  endReached: {
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default React.memo(ListFooter);
