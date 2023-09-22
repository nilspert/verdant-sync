import React from 'react';
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import SettingsScreen from '../screens/settings-screen';
import UserSettingsScreen from '../screens/user-settings-screen';
import AuthorizedDevicesScreen from '../screens/authorized-devices-screen';
import CustomNavigationBar from '../components/navigation/custom-navigation-bar';
import { theme } from '../assets/themes/theme';
import { StyleSheet } from 'react-native';
import TabBarIcon, { TabBarIconProps } from '../components/navigation/tab-bar-icon';
import NotificationsScreen from '../screens/notifications-screen';
import BoardViewSelectorScreen from '../screens/board-view-selector-sreen';

type RootTabParamList = {
  Home: undefined;
  Notifications: undefined;
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
          tabBarInactiveTintColor: '#CCCCCC',
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
          name="Notifications"
          component={NotificationsScreen}
          options={{
            title: 'Notifications',
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
      <Stack.Screen
        name="BoardInfo"
        options={{ headerShown: false }}
        component={BoardViewSelectorScreen}
      />
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
        options={{ title: 'User settings', headerMode: 'float' }}
        component={UserSettingsScreen}
      />
      <Stack.Screen
        name="AuthorizedDevices"
        options={{ title: 'Authorized devices', headerMode: 'float' }}
        component={AuthorizedDevicesScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  stackScreenHeader: { backgroundColor: '#eee' },
});

export default AppNavigator;
