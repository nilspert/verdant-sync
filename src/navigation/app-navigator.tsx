/**
 * File: app-navigator.tsx
 * Author: Joonas Nislin
 * Date: 18.8.2023
 * Description: This file contains component definition for appNavigator.
 * Application navigator which handles main and sub views for authorized user
 */
import React from 'react';
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  StackHeaderProps,
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import SettingsScreen from '../screens/settings-screen';
import UserSettingsScreen from '../screens/user-settings-screen';
import AuthorizedDevicesScreen from '../screens/authorized-devices-screen';
import CustomNavigationBar from '../components/navigation/custom-navigation-bar';
import { theme } from '../assets/themes/theme';
import { StyleSheet } from 'react-native';
import { TabBarIcon, TabBarIconProps } from '../components/navigation/tab-bar-icon';
import DeviceViewSelectorScreen from '../screens/device-view-selector-sreen';
import TabBarLabel, { TabBarLabelProps } from '../components/navigation/tab-bar-label';

// Type definition for RootTabParamList
type RootTabParamList = {
  Devices: undefined;
  Notifications: undefined;
  Settings: undefined;
};

// Type definition for RootStackParamList
type RootStackParamList = {
  DevicesLanding: undefined;
  DeviceInfo: undefined;
  SettingsLanding: undefined;
  UserSettings: undefined;
  AuthorizedDevices: undefined;
};

// Access tab and stack navigators
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Custom transition animation that removes header and card animations
const customTransition = {
  ...TransitionSpecs.TransitionIOSSpec,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

// Function for rendering custom navigation bar
const RenderNavigationBar = (props: StackHeaderProps | BottomTabHeaderProps) => {
  return <CustomNavigationBar {...props} />;
};

// Function for rendering tab bar icon
const getTabBarIcon = ({ color, size, focused, iconName }: TabBarIconProps) => {
  return <TabBarIcon iconName={iconName} color={color} size={size} focused={focused} />;
};

// Function for rendering tab bar label
const getTabBarLabel = ({ color, focused, label }: TabBarLabelProps) => {
  return <TabBarLabel color={color} focused={focused} label={label} />;
};

// Component definition for AppNavigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyle: { backgroundColor: '#EEEEEE' },
          headerShown: false,
          tabBarHideOnKeydevice: true,
          tabBarStyle: { backgroundColor: theme.colors.primary },
          tabBarActiveTintColor: '#F7F7F7',
          tabBarInactiveTintColor: '#CCCCCC',
          tabBarLabel: ({ color, focused }) =>
            getTabBarLabel({ color, focused, label: route.name }),
        })}
      >
        <Tab.Screen
          name="Devices"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon({ color, size, focused, iconName: 'sprout' }),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              getTabBarIcon({ color, size, focused, iconName: 'cog' }),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Component definition for HomeStackScreen
const HomeStackScreen: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="DevicesLanding"
      screenOptions={{
        headerStyle: styles.stackScreenHeader,
        headerTintColor: '#ffffff',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: '#EEEEEE' },
      }}
    >
      <Stack.Screen
        options={{ header: (props) => RenderNavigationBar(props) }}
        name="DevicesLanding"
        component={HomeScreen}
      />
      <Stack.Screen
        name="DeviceInfo"
        options={{ title: 'Device info', ...customTransition }}
        component={DeviceViewSelectorScreen}
      />
    </Stack.Navigator>
  );
};

// Component definition for SettingsStackScreen
const SettingsStackScreen: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsLanding"
      screenOptions={{
        headerStyle: styles.stackScreenHeader,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: '#EEEEEE' },
      }}
    >
      <Stack.Screen
        options={{ header: (props) => RenderNavigationBar(props) }}
        name="SettingsLanding"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="UserSettings"
        options={{
          title: 'User settings',
          headerStyle: styles.stackScreenHeader,
          headerTintColor: '#ffffff',
          ...customTransition,
        }}
        component={UserSettingsScreen}
      />
      <Stack.Screen
        name="AuthorizedDevices"
        options={{
          title: 'Authorized devices',
          headerStyle: styles.stackScreenHeader,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#ffffff',
          ...customTransition,
        }}
        component={AuthorizedDevicesScreen}
      />
    </Stack.Navigator>
  );
};

// AppNavigator styles
const styles = StyleSheet.create({
  stackScreenHeader: { backgroundColor: theme.colors.primary },
  headerTitle: { color: '#F7F7F7' },
});

// Export AppNavigator component
export default AppNavigator;
