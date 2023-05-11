import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';
import { Animated, Pressable, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CameraSetting, getAvailableExposureTimes, getAvailableFocusDistances, getAvailableISOValues, getAvailableZoomValues, setAutoExposure, setAutoFocus, setExposureTime, setFocusDistance, setISO, setWhiteBalance
} from '../../../redux/cameraSettings';
import { useDispatch, useSelector } from '../../../redux/store';
import Slider from '../../common/Slider/Slider';
import Typography from '../../common/Typography/Typography';
import SettingAutoToggle, { AutoCameraSetting } from './SettingAutoToggle';
import styles, { autoToggleSize } from './styles';

export type AdjustableCameraSetting = (
  CameraSetting.ISO
  | CameraSetting.ExposureTime
  | CameraSetting.FocusDistance
  // | CameraSetting.WhiteBalance
);

interface SettingProps {
  // Display-friendly name for the setting (if it should be displayed)
  name?: string,
  // Icon to use for setting button
  icon: JSX.Element,
  // Redux action to set the new value
  setter: ActionCreatorWithPayload<any>,
  // Redux action to set auto on/off
  autoSetting: AutoCameraSetting,
  // Callback to get the range of possible values for the setting
  getRange: () => Promise<[number, number]>,
  // Unit to display after the setting value
  unit: string,
  // Multiplier to use for the raw setting value when displaying to user (default 1)
  formattedMultiplier?: number,
  // Whether or not to scale slider values logarithmically
  logarithmic?: boolean,
};

// (potential) TODO: if white balance is implemented, add white balance setting here
const cameraSettingProps: Record<AdjustableCameraSetting, SettingProps> = {
  [CameraSetting.ISO]: {
    icon: <Typography variant="bodyLarge" color="white">ISO</Typography>,
    setter: setISO,
    autoSetting: CameraSetting.AutoExposure,
    getRange: getAvailableISOValues,
    unit: '',
  },
  [CameraSetting.ExposureTime]: {
    name: 'Exposure Time',
    icon: <MaterialCommunityIcons name="camera-iris" color="white" size={24} />,
    setter: setExposureTime,
    autoSetting: CameraSetting.AutoExposure,
    getRange: getAvailableExposureTimes,
    formattedMultiplier: 1 / 1000000000,
    unit: 's',
    logarithmic: true,
  },
  [CameraSetting.FocusDistance]: {
    name: 'Focus',
    icon: <MaterialCommunityIcons name="image-filter-center-focus" color="white" size={24} />,
    setter: setFocusDistance,
    autoSetting: CameraSetting.AutoFocus,
    getRange: getAvailableFocusDistances,
    unit: '',
  },
  // [CameraSetting.WhiteBalance]: {
  //   icon: <Typography variant="bodyLarge" color="white">WB</Typography>,
  //   setter: setWhiteBalance,
  //   getRange: getAvail
  //   unit: 'K',
  // },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface SettingButtonProps {
  setting: AdjustableCameraSetting,
  enabled?: Boolean,
};

function formatValue(value: number, unit: string, isAuto: boolean, formattedMultiplier = 1) {
  // Format number
  if (isAuto) return 'AUTO';
  value = value * formattedMultiplier;

  // Determine decimal places to print
  let sigFigs = 0;
  if (value !== 0 && Math.abs(value) < 100) sigFigs = Math.max(1, Math.round(-Math.log10(Math.abs(value))) + 1);

  // Calculate value to print
  const displayValue = value.toFixed(sigFigs);
  return displayValue + unit;
};

// (potential) TODO: if adding rotation, rotate button with device
const SettingButton: React.FC<SettingButtonProps> = ({ setting, enabled = true }) => {
  const dispatch = useDispatch();

  const props = cameraSettingProps[setting];
  const cameraSettingState = useSelector((state) => state.cameraSettings);
  const value = cameraSettingState[setting]
  const isAuto = cameraSettingState[props.autoSetting];

  const [expanded, setExpanded] = React.useState(false);

  // Determine setting range on initial render
  const [range, setRange] = React.useState<[number, number]>();
  React.useEffect(() => {
    props.getRange().then((calculatedRange) => {
      setRange(calculatedRange)
    });
  }, []);

  // Transition background color on touch
  const animation = React.useRef(new Animated.Value(0)).current;
  const expand = () => Animated.timing(animation, { toValue: 1, duration: 300, useNativeDriver: false }).start();
  const collapse = () => Animated.timing(animation, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  const touchableStyle = {
    ...styles.settingButtonTouchable,
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)'],
    }),
    borderRadius: 6,
  };

  const handleButtonPress = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded);
    newExpanded ? expand() : collapse();
  };

  const handleSliderChange = (newValue: number) => {
    dispatch(props.setter(newValue));
  };

  const slider = (expanded && range) ? (
    <View style={styles.sliderContainer}>
      <View style={styles.slider}>
        <Slider value={value} range={range} onChange={handleSliderChange} logarithmic={props.logarithmic} />
      </View>
      <View style={styles.autoToggle}>
        <SettingAutoToggle setting={props.autoSetting} size={autoToggleSize} />
      </View>
    </View>
  ) : null;

  const nameText = props.name ? (
    <Typography style={styles.nameText} variant="bodySmall" color="white">
      {props.name}
    </Typography>
  ) : undefined;

  return (
    <AnimatedPressable style={touchableStyle} onPress={handleButtonPress}>
      {nameText}
      {props.icon}
      <Typography variant="bodySmall" color="white">
        {formatValue(value, props.unit, isAuto, props.formattedMultiplier)}
      </Typography>
      {slider}
    </AnimatedPressable>
  );
};

export default SettingButton;
