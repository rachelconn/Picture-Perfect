import { requireNativeComponent } from 'react-native';

export interface CameraProps {
  style: any;
};

const Camera = requireNativeComponent('CameraView');

export default Camera;
