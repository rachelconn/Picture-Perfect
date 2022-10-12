import React, { useContext } from 'react';
import { View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ShutterButton from './ShutterButton';
import SettingButton, { AdjustableCameraSetting }  from './SettingButton/SettingButton';
import { CameraSetting, captureImage } from '../../redux/cameraSettings';
import Camera from './Camera';
import { CameraPageNavigationProp } from '../common/NavigationStack/NavigationStack';
import FocusAwareStatusBar from '../common/FocusAwareStatusBar/FocusAwareStatusBar';
import NavigationContext from '../common/NavigationStack/NavigationContext';
import Typography from '../common/Typography/Typography';
import { useSelector } from '../../redux/store';

const CameraPage: React.FC = () => {
  const navigation = useNavigation<CameraPageNavigationProp>();
  const [hasCameraPermission, setHasCameraPermission] = React.useState<Boolean>();
  const { setImageURI } = useContext(NavigationContext);
  const cameraSettings = useSelector((state) => state.cameraSettings);

  React.useEffect(() => {
    (async () => {
      // Request camera permission
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

  }, []);

  const adjustableSettings: AdjustableCameraSetting[] = [
    CameraSetting.FocusDistance,
    CameraSetting.ExposureTime,
    CameraSetting.ISO,
  ];

  const settingButtons = adjustableSettings.map((setting) => (
    <SettingButton setting={setting} key={setting} />
  ));

  const onShutterPress = () => {
    captureImage().then((imageURI) => {
      setImageURI(imageURI);
      navigation.navigate('Evaluation');
    });
  };

  if (hasCameraPermission === undefined) return <View style={styles.background} />;
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
