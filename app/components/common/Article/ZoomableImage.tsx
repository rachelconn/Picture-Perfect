import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ImageStyle,
  NativeTouchEvent,
  PanResponder,
  StyleProp,
  View,
  ViewStyle,
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
  onPress?: () => any;
  source: ImageSourcePropType;
  style?: ZoomableImageStyle;
}

interface Point {
  x: number,
  y: number,
}

interface ZoomableImageState {
  scale: number;
  top: number,
  left: number,
  offsetTop: number,
  offsetLeft: number,
  isDragging: boolean,
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
  const windowSize = Dimensions.get('window');
  const initialScale = props.initialScale ?? 1;

  const [state, setState] = React.useState<ZoomableImageState>({
    scale: initialScale,
    top: (windowSize.height - props.imageHeight * initialScale) / 2,
    left: (windowSize.width - props.imageWidth * initialScale) / 2,
    offsetTop: 0,
    offsetLeft: 0,
    isDragging: false,
  });

  // Modifies newState in-place to apply panning (assumes that newState.touchCenter has already been updated)
  function applyPanning(newState: ZoomableImageState) {
    const dx = newState.touchCenter!.x - state.touchCenter!.x;
    const dy = newState.touchCenter!.y - state.touchCenter!.y;
    const overflowX = Math.max(0, props.imageWidth * newState.scale - windowSize.width);
    const overflowY = Math.max(0, props.imageHeight * newState.scale - windowSize.height);
    newState.offsetTop = clamp(state.offsetTop + dy, -overflowY / 2, overflowY / 2);
    newState.offsetLeft = clamp(state.offsetLeft + dx, -overflowX / 2, overflowX / 2);
  }

  function handleSingleTouchMove(touches: NativeTouchEvent[]) {
    const touch = touches[0]
    const newState: ZoomableImageState = { ...state };
    newState.numTouches = 1;
    newState.touchCenter = { x: touch.pageX, y: touch.pageY };

    // TODO: pan depending on new touch position
    if (touches.length === state.numTouches && state.touchCenter) {
      applyPanning(newState);
    }

    newState.isDragging = true;
    setState(newState);
  }

  function handleMultiTouchMove(touches: NativeTouchEvent[]) {
    const newState: ZoomableImageState = { ...state };
    newState.numTouches = touches.length;

    // Handle zooming based on touch distance
    newState.touchDistance = calculateDistance(touches[0], touches[1]);
    if (state.touchDistance && touches.length === state.numTouches) {
      const unclampedNewScale = newState.touchDistance / state.touchDistance * state.scale;
      newState.scale = clamp(unclampedNewScale, props.minScale ?? 0, props.maxScale ?? Infinity);
      newState.top = (windowSize.height - props.imageHeight * newState.scale) / 2;
      newState.left = (windowSize.width - props.imageWidth * newState.scale) / 2;
    }

    // Handle panning based on touch center point
    newState.touchCenter = calculateTouchCenter(touches);
    if (state.touchCenter && touches.length === state.numTouches) {
      applyPanning(newState);
    }

    newState.isDragging = true;
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
          isDragging: false,
        });
      },
      onPanResponderMove: (event) => {
        const touches = event.nativeEvent.touches;
        if (touches.length > 1) handleMultiTouchMove(touches);
        else if (touches.length === 1) handleSingleTouchMove(touches);
      },
      onPanResponderEnd() {
          if (props.onPress && !state.isDragging) props.onPress();
      },
    })
  ), [state]);

  // TODO: set top and left to respond to panning
  const scaledImageWidth = props.imageWidth * state.scale;
  const scaledImageHeight = props.imageHeight * state.scale;
  const imageStyle: StyleProp<ImageStyle> = {
    position: 'absolute',
    top: state.top + state.offsetTop,
    left: state.left + state.offsetLeft,
    width: scaledImageWidth,
    height: scaledImageHeight,
  }

  // TODO: detect back press
  return (
    <View style={props.style} {...panResponder.panHandlers}>
      <Image style={imageStyle} source={props.source} />
    </View>
  );
};

export default ZoomableImage;
