import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignUpScreen';
import EmailPasswordSignInScreen from '../screens/auth/EmailPasswordSignInScreen';
import AnonymousSignInScreen from '../screens/auth/AnonymousSignInScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignOutScreen} />
        <Stack.Screen name="EmailSignIn" component={EmailPasswordSignInScreen} />
        <Stack.Screen name="AnonymousSignIn" component={AnonymousSignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
