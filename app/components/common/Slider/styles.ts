import { StyleSheet } from 'react-native';

const innerRadius = 16;
const outerRadius = 20;
const sliderBarHeight = 4;

export default StyleSheet.create({
  sliderContainer: {
    position: 'relative',
    height: outerRadius,
    justifyContent: 'center',
  },
  progressBar: {
    position: 'absolute',
    transform: [{ translateY: -sliderBarHeight / 2 }],
  },
  sliderKnobOuter: {
    position: 'absolute',
    backgroundColor: 'gray',
    width: outerRadius,
    height: outerRadius,
    borderRadius: outerRadius / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -innerRadius / 2 }],
  },
  sliderKnobOuterDisabled: {
    backgroundColor: '#444',
  },
  sliderKnobInner: {
    backgroundColor: 'white',
    width: innerRadius,
    height: innerRadius,
    borderRadius: innerRadius / 2,
  },
  sliderKnobInnerDisabled: {
    backgroundColor: '#666',
  },
  sliderPressed: {
    opacity: 0.8,
  },
  sliderBarContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  sliderBarFilled: {
    backgroundColor: 'white',
    height: sliderBarHeight,
  },
  sliderBarFilledDisabled: {
    backgroundColor: 'gray',
  },
  sliderBarUnfilled: {
    backgroundColor: 'darkgray',
    height: sliderBarHeight,
    flex: 1,
  },
  sliderBarUnfilledDisabled: {
    backgroundColor: '#444'
  },
});
