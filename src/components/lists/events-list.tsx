import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import defaultStyles from '../../assets/themes/default-styles';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import useEvents from '../../hooks/use-events';
import { Board, Event, Severity } from '../../types/types';
import EventItem from '../events/event-item';
import EventListHeader from '../events/event-list-header';
import ListFooter from './list-footer';

interface EventsListProps {
  filteredBoard: Board;
}

const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 190;
const flatListHeight = windowHeight - eventListHeaderHeight;

const RenderSeparator = () => <Separator mode="horizontal" />;

const RenderItem = (item: Event) => {
  return <EventItem item={item} />;
};

const RenderListFooter = (loading: boolean, showEndReached: boolean) => {
  return <ListFooter loading={loading} showEndReached={showEndReached} />;
};

const EventsList: React.FC<EventsListProps> = ({ filteredBoard }) => {
  const [onEndReachedCalled, setOnEndReachedCalled] = React.useState(false);
  const [filterSeverity, setFilterSeverity] = React.useState<Severity>('INFO' as Severity);
  const { eventsData, loadingEventsData, handleLoadMore, selectedDate, handleDateNavigation } =
    useEvents(filterSeverity, filteredBoard.macAddress);

  const filteredEvents = Object.values(eventsData[filterSeverity]);

  const handleEndReached = () => {
    if (!onEndReachedCalled) {
      setOnEndReachedCalled(true);
      handleLoadMore(filterSeverity);
    }
  };

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

export default EventsList;
