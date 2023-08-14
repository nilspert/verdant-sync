import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../themes/defaultStyles';

const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose login option:</Text>

      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('EmailSignIn')}
        >
          Email
        </Button>

        <Button
          style={styles.outlinedButton}
          mode="outlined"
          onPress={() => navigation.navigate('AnonymousSignIn')}
        >
          Anonymous
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;
