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
import TabBarIcon, { TabBarIconProps } from '../components/navigation/tab-bar-icon';
import BoardViewSelectorScreen from '../screens/board-view-selector-sreen';
import TabBarLabel, { TabBarLabelProps } from '../components/navigation/tab-bar-label';

type RootTabParamList = {
  Devices: undefined;
  Notifications: undefined;
  Settings: undefined;
};

type RootStackParamList = {
  DevicesLanding: undefined;
  BoardInfo: undefined;
  SettingsLanding: undefined;
  UserSettings: undefined;
  AuthorizedDevices: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const customTransition = {
  ...TransitionSpecs.TransitionIOSSpec,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

const RenderNavigationBar = (props: StackHeaderProps | BottomTabHeaderProps) => {
  return <CustomNavigationBar {...props} />;
};

const getTabBarIcon = ({ color, size, focused, iconName }: TabBarIconProps) => {
  return <TabBarIcon iconName={iconName} color={color} size={size} focused={focused} />;
};

const getTabBarLabel = ({ color, focused, label }: TabBarLabelProps) => {
  return <TabBarLabel color={color} focused={focused} label={label} />;
};

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
          tabBarHideOnKeyboard: true,
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
        name="BoardInfo"
        options={{ title: 'Board info', ...customTransition }}
        component={BoardViewSelectorScreen}
      />
    </Stack.Navigator>
  );
};

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

const styles = StyleSheet.create({
  stackScreenHeader: { backgroundColor: theme.colors.primary },
  headerTitle: { color: '#F7F7F7' },
});

export default AppNavigator;
