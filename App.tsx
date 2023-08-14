import React from 'react';
import { StatusBar } from 'react-native';
import './config/firebase';
import RootNavigation from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/themes/theme';

const App: React.FC = () => {
  // Customize StatusBar properties here
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('#ffffff'); // Set the background color

  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
