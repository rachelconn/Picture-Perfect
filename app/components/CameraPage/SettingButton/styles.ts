import { Dimensions, StyleSheet } from 'react-native';

const windowSize = Dimensions.get('window');
const sliderWidth = windowSize.height * 0.2;
const sliderHeight = 40;
const sliderPadding = 12;
const settingButtonSize = 56;
export const autoToggleSize = 24;

export default StyleSheet.create({
  settingButtonTouchable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: settingButtonSize,
    height: settingButtonSize,
    padding: 4,
    transform: [{ rotate: '90deg'}],
    position: 'relative',
    zIndex: 2,
  },
  sliderContainer: {
    position: 'absolute',
    left: settingButtonSize + 36,
    display: 'flex',
    flexDirection: 'row',
    width: sliderWidth + sliderPadding * 2 + autoToggleSize + 8,
    backgroundColor: '#00000080',
    borderRadius: 6,
    padding: sliderPadding,
    height: sliderHeight,
    zIndex: 1,
  },
  sliderContainerAutoDisabled: {
    width: sliderWidth + sliderPadding * 2 + 8,
  },
  slider: {
    width: sliderWidth,
    justifyContent: 'center',
  },
  autoToggle: {
    justifyContent: 'center',
  },
  nameText: {
    textAlign: 'center',
  },
});
