import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import CameraPage from '../../CameraPage/CameraPage';
import EvaluationPage from '../../EvaluationPage/EvaluationPage';
import NavigationContext from './NavigationContext';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Camera: undefined,
  Evaluation: undefined,
};

export type CameraPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
export type EvaluationPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Evaluation'>;

const NavigationStack = () => {
  const [imageURI, setImageURI] = React.useState('');

  return (
    <NavigationContext.Provider value={{ imageURI, setImageURI }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Camera"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Camera" component={CameraPage} />
          <Stack.Screen name="Evaluation" component={EvaluationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
};

export default NavigationStack;
