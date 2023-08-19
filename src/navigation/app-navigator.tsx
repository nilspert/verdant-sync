import React from 'react';
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import EventsScreen from '../screens/events-screen';
import SettingsScreen from '../screens/settings-screen';
import UserSettingsScreen from '../screens/user-settings-screen';
import AuthorizedDevicesScreen from '../screens/authorized-devices-screen';
import BoardInfo from '../screens/board-info-screen';
import CustomNavigationBar from '../components/navigation/custom-navigation-bar';
import { theme } from '../assets/themes/theme';
import { StyleSheet } from 'react-native';
import TabBarIcon, { TabBarIconProps } from '../components/navigation/tab-bar-icon';

type RootTabParamList = {
  Home: undefined;
  Events: undefined;
  Settings: undefined;
};

type RootStackParamList = {
  HomeLanding: undefined;
  BoardInfo: undefined;
  SettingsLanding: undefined;
  UserSettings: undefined;
  AuthorizedDevices: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const RenderNavigationBar = (props: BottomTabHeaderProps) => {
  return <CustomNavigationBar {...props} />;
};

const getTabBarIcon = ({ color, size, focused, iconName }: TabBarIconProps) => {
  return <TabBarIcon iconName={iconName} color={color} size={size} focused={focused} />;
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: (props) => RenderNavigationBar(props),
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: '#F7F7F7',
          tabBarInactiveTintColor: '#F7F7F7',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            title: 'Devices',
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon({ color, size, focused, iconName: 'sprout' }),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon({ color, size, focused, iconName: 'bell-badge' }),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon({ color, size, focused, iconName: 'cog' }),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeStackScreen: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.stackScreenHeader,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="HomeLanding" component={HomeScreen} />
      <Stack.Screen name="BoardInfo" options={{ title: 'Board Info' }} component={BoardInfo} />
    </Stack.Navigator>
  );
};

const SettingsStackScreen: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.stackScreenHeader,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="SettingsLanding"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="UserSettings"
        options={{ title: 'User settings' }}
        component={UserSettingsScreen}
      />
      <Stack.Screen
        name="AuthorizedDevices"
        options={{ title: 'Authorized devices' }}
        component={AuthorizedDevicesScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  stackScreenHeader: { backgroundColor: '#eee' },
});

export default AppNavigator;
