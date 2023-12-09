/**
 * File: list-footer.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for ListFooter.
 * This component is used to display list footer element or loading spinner
 * - When user has reached the end of the list, display footer
 * - When there is a ongoing fetch operation, display loading spinner
 */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LoadingSpinner from '../common/loading-spinner';
import Separator from '../common/separator';

// ListFooter props
interface InfoMessageProps {
  loading: boolean;
  showEndReached: boolean;
}

// Component definition
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

// ListFooter styles
const styles = StyleSheet.create({
  endReached: {
    textAlign: 'center',
    paddingVertical: 10,
  },
});

// Export ListFooter component
export default React.memo(ListFooter);
