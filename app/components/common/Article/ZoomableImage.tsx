import React from 'react';
import {
  Dimensions,
  Image, ImageSourcePropType, ImageStyle, NativeTouchEvent, PanResponder, StyleProp, View, ViewStyle,
} from 'react-native';
import { clamp } from '../../../utils/math';

// Interfaces
interface ZoomableImageStyle extends ViewStyle {
  width: number;
  height: number;
}

interface ZoomableImageProps {
  imageWidth: number;
  imageHeight: number;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  source: ImageSourcePropType;
  style?: ZoomableImageStyle;
}

interface Point {
  x: number,
  y: number,
}

interface ZoomableImageState {
  scale: number;
  numTouches?: number,
  touchCenter?: Point,
  touchDistance?: number,
}


// Helper functions
function calculateDistance(t1: NativeTouchEvent, t2: NativeTouchEvent): number {
  return Math.sqrt(Math.pow(t2.pageX - t1.pageX, 2) + Math.pow(t2.pageY - t1.pageY, 2));
}

function calculateTouchCenter(touches: NativeTouchEvent[]): Point {
  const sumOfTouches: Point = { x: 0, y: 0 };
  touches.forEach((touch) => {
    sumOfTouches.x += touch.pageX;
    sumOfTouches.y += touch.pageY;
  });
  return { x: sumOfTouches.x / touches.length, y: sumOfTouches.y / touches.length };
}


// Component
const ZoomableImage: React.FC<ZoomableImageProps> = (props) => {
  const [state, setState] = React.useState<ZoomableImageState>({
    scale: props.initialScale ?? 1,
  });
  const windowSize = Dimensions.get('window');

  function handleSingleTouch(touches: NativeTouchEvent[]) {
    const newState: ZoomableImageState = { ...state };
    newState.numTouches = touches.length;

    // TODO: pan depending on new touch position
    if (touches.length === state.numTouches) {

    }

    setState(newState);
  }

  function handleMultiTouch(touches: NativeTouchEvent[]) {
    const newState: ZoomableImageState = { ...state };
    newState.numTouches = touches.length;

    // Handle panning based on touch center point
    newState.touchCenter = calculateTouchCenter(touches);
    // TODO: pan depending on new touch center
    if (state.touchCenter && touches.length === state.numTouches) {

    }

    // Handle zooming based on touch distance
    newState.touchDistance = calculateDistance(touches[0], touches[1]);
    if (state.touchDistance && touches.length === state.numTouches) {
      const unclampedNewScale = newState.touchDistance / state.touchDistance * state.scale;
      newState.scale = clamp(unclampedNewScale, props.minScale ?? 0, props.maxScale ?? Infinity);
    }

    setState(newState);
  }

  const panResponder = React.useMemo(() => (
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        // On gesture start, reset per-gesture variables
        setState({
          ...state,
          numTouches: 0,
          touchCenter: undefined,
          touchDistance: undefined,
        });
      },
      onPanResponderMove: (event, _gestureState) => {
        const touches = event.nativeEvent.touches;
        if (touches.length > 1) handleMultiTouch(touches);
        else if (touches.length === 1) handleSingleTouch(touches);
      },
    })
  ), [state]);

  // TODO: set top and left to respond to panning
  const scaledImageWidth = props.imageWidth * state.scale;
  const scaledImageHeight = props.imageHeight * state.scale;
  const imageStyle: StyleProp<ImageStyle> = {
    position: 'absolute',
    top: (windowSize.height - scaledImageHeight) / 2,
    left: (windowSize.width - scaledImageWidth) / 2,
    width: scaledImageWidth,
    height: scaledImageHeight,
  }

  return (
    <View style={props.style} {...panResponder.panHandlers}>
      <Image style={imageStyle} source={props.source} />
    </View>
  );
};

export default ZoomableImage;
