/**
 * File: events-list.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for AuthorizedDevicesList.
 * This component is used to manage authorized devices
 */

import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import defaultStyles from '../../assets/themes/default-styles';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import useEvents from '../../hooks/use-events';
import { Device, Event, Severity } from '../../types/types';
import EventItem from '../events/event-item';
import EventListHeader from '../events/event-list-header';
import ListFooter from './list-footer';

// EventsList props
interface EventsListProps {
  filteredDevice: Device;
}

// Calculate scrollViewHeight so that the flatlist does not get overlapped by bottom navigation
const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 190;
const flatListHeight = windowHeight - eventListHeaderHeight;

// Function to render separator component horizontally
const RenderSeparator = () => <Separator mode="horizontal" />;

// Function for rendering event item
const RenderItem = (item: Event) => {
  return <EventItem item={item} />;
};

// Function for rendering list footer
const RenderListFooter = (loading: boolean, showEndReached: boolean) => {
  return <ListFooter loading={loading} showEndReached={showEndReached} />;
};

// Component definition
const EventsList: React.FC<EventsListProps> = ({ filteredDevice }) => {
  // State that checks if user has scrolled to the end of list
  const [onEndReachedCalled, setOnEndReachedCalled] = React.useState(false);
  // State that holds selected severity filter
  const [filterSeverity, setFilterSeverity] = React.useState<Severity>('INFO' as Severity);
  // Call useEvents hook with selected severity filter and selected device macAddress
  const { eventsData, loadingEventsData, handleLoadMore, selectedDate, handleDateNavigation } =
    useEvents(filterSeverity, filteredDevice.macAddress);

  // Display only events for selected severity filter
  const filteredEvents = Object.values(eventsData[filterSeverity]);

  // Function for handling scroll to the end of list
  const handleEndReached = () => {
    if (!onEndReachedCalled) {
      setOnEndReachedCalled(true);
      handleLoadMore(filterSeverity);
    }
  };

  // Function for resetting onEndReachedCalled when user scrolls up from bottom
  const handleScroll = () => {
    if (onEndReachedCalled && !loadingEventsData[filterSeverity]) {
      setOnEndReachedCalled(false);
    }
  };

  return (
    <View>
      <GestureHandlerRootView>
        <FlatList
          nestedScrollEnabled
          style={[
            defaultStyles.contentContainer,
            styles.container,
            filteredEvents.length > 3 && styles.flatList,
          ]}
          ListHeaderComponent={
            <EventListHeader
              filterSeverity={filterSeverity}
              setFilterSeverity={setFilterSeverity}
              eventsLength={filteredEvents.length}
              selectedDate={selectedDate}
              handleDateNavigation={handleDateNavigation}
            />
          }
          contentContainerStyle={styles.contentContainer}
          data={filteredEvents}
          keyExtractor={(item) => item.messageId}
          ItemSeparatorComponent={RenderSeparator}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={
            loadingEventsData[filterSeverity] ? null : (
              <View style={styles.infoMessageContainer}>
                <InfoMessage message="No events found with current settings and filters." />
              </View>
            )
          }
          ListFooterComponent={() =>
            RenderListFooter(
              loadingEventsData[filterSeverity],
              filteredEvents.length ? true : false,
            )
          }
          renderItem={({ item }) => RenderItem(item)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </GestureHandlerRootView>
    </View>
  );
};

// EventsList styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  contentContainer: {
    flexGrow: 0,
  },
  flatList: {
    height: flatListHeight,
  },
  infoMessageContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
});

// Export EventsList component
export default EventsList;
