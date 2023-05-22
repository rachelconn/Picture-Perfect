import React, { useContext } from 'react';
import { View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton, { AdjustableCameraSetting }  from './SettingButton/SettingButton';
import { CameraSetting, captureImage, resetAllSettings } from '../../redux/cameraSettings';
import Camera from './Camera';
import { CameraPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import FocusAwareStatusBar from '../common/FocusAwareStatusBar/FocusAwareStatusBar';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import Typography from '../common/Typography/Typography';
import Lesson from '../../classes/lesson';
import { useDispatch, useSelector } from '../../redux/store';
import { AutoCameraSetting, autoCameraSettings, autoSettingProps } from './SettingButton/SettingAutoToggle';

const adjustableSettings: AdjustableCameraSetting[] = [
  CameraSetting.FocusDistance,
  CameraSetting.ExposureTime,
  CameraSetting.ISO,
];

const manualOnlySettingsForLesson: Record<Lesson, AutoCameraSetting[]> = {
  [Lesson.Focus]: [CameraSetting.AutoFocus],
  [Lesson.Bokeh]: [CameraSetting.AutoFocus],
  [Lesson.Exposure]: [CameraSetting.AutoExposure],
  [Lesson.LowLight]: [CameraSetting.AutoExposure],
};

const autoOnlySettingsForLesson: Record<Lesson, AutoCameraSetting[]> = {
  [Lesson.Focus]: [CameraSetting.AutoExposure],
  [Lesson.Bokeh]: [],
  [Lesson.Exposure]: [],
  [Lesson.LowLight]: [],
};

const CameraPage: React.FC = () => {
  const navigation = useNavigation<CameraPageNavigationProp>();
  const dispatch = useDispatch();
  const lesson = useSelector<Lesson>((state) => state.currentLesson.lesson);
  const manualOnlySettings = manualOnlySettingsForLesson[lesson];
  const autoOnlySettings = autoOnlySettingsForLesson[lesson];

  const [hasCameraPermission, setHasCameraPermission] = React.useState<Boolean>();
  const [initialized, setInitialized] = React.useState(false);
  const { setImageURI } = useContext(NavigationContext);

  React.useEffect(() => {
    // Asynchronously request camera permission
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

    // Set auto settings: default is auto unless manual-only
    autoCameraSettings.forEach((setting) => {
      const isAuto = !manualOnlySettings.includes(setting);
      dispatch(autoSettingProps[setting].setter(isAuto));
    });

    setInitialized(true);

    // On unmount, reset settings as the new camera view will have newly initialized settings
    return () => {
      dispatch(resetAllSettings());
    };
  }, []);

  const settingButtons = adjustableSettings.map((setting) => (
    <SettingButton setting={setting} autoOnlySettings={autoOnlySettings} manualOnlySettings={manualOnlySettings} key={setting} />
  ));

  const onShutterPress = () => {
    captureImage().then((imageURI) => {
      setImageURI(imageURI);
      navigation.navigate('Evaluation');
    });
  };

  if (hasCameraPermission === undefined || !initialized) return <View style={styles.background} />;
  else if (hasCameraPermission === false) return <Typography color="black" variant="bodyLarge">Camera permission denied.</Typography>;
  return (
    <View style={styles.background}>
      <FocusAwareStatusBar hidden />
      <View style={styles.settingsContainer}>
        {settingButtons}
      </View>
      <Camera style={styles.cameraContainer} />
      <View style={styles.shutterButtonContainer}>
        <ShutterButton onPress={onShutterPress} />
      </View>
    </View>
  );
};

export default CameraPage;
