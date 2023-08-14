import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../themes/defaultStyles';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verdant Sync</Text>

      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Button>
        <Button
          style={styles.outlinedButton}
          mode="outlined"
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;
