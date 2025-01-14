import React from 'react';
import './config/firebase';
import RootNavigation from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/assets/themes/theme';

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
