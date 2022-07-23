import React from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import NavigationStack from './app/components/common/NavigationStack/NavigationStack';
import store from './app/redux/store';

// Ignore deprecation warnings from libraries - PropTypes aren't used anywhere in this codebase
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
]);

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationStack />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
