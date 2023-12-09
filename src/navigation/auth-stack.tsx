/**
 * File: auth-stack.tsx
 * Author: Joonas Nislin
 * Date: 18.8.2023
 * Description: This file contains component definition for authStack.
 * Navigator which handles views for unauthorized user
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/welcome-screen';
import SignInScreen from '../screens/sign-in-screen';
import SignUpScreen from '../screens/sign-up-screen';

// Access stack navigator
const Stack = createStackNavigator();

// Component definition and export for AuthStack
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} // Hide AppBar for all screens
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
