import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import CameraPage from '../../CameraPage/CameraPage';
import EvaluationPage from '../../EvaluationPage/EvaluationPage';
import LessonSelectPage from '../../LessonSelectPage/LessonSelectPage';
import ExposureLesson from '../../Lessons/ExposureLesson';
import FocusLesson from '../../Lessons/FocusLesson';
import NavigationContext from './NavigationContext';
import LowLightPhotographyLesson from '../../Lessons/LowLightPhotographyLesson';
import Lesson from '../../../classes/lesson';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  LessonSelect: undefined,
  Exposure: undefined,
  Camera: undefined,
  Evaluation: undefined,
};

export type LessonSelectPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LessonSelect'>;
export type CameraPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
export type EvaluationPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Evaluation'>;

const NavigationStack = () => {
  const [imageURI, setImageURI] = React.useState('');

  return (
    <NavigationContext.Provider value={{ imageURI, setImageURI }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LessonSelect"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LessonSelect" component={LessonSelectPage} />
          <Stack.Screen name={Lesson.Focus} component={FocusLesson} />
          <Stack.Screen name={Lesson.Exposure} component={ExposureLesson} />
          <Stack.Screen name={Lesson.LowLight} component={LowLightPhotographyLesson} />
          <Stack.Screen name="Camera" component={CameraPage} />
          <Stack.Screen name="Evaluation" component={EvaluationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
};

export default NavigationStack;
