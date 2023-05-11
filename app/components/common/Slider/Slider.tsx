import React from 'react';
import { Animated, GestureResponderEvent, LayoutChangeEvent, PanResponder, View } from 'react-native';
import { clamp, interpolate } from '../../../utils/math';
import styles from './styles';

interface SliderElementInfo {
  x: number,
  y: number,
  height: number,
  width: number,
}

interface SliderProps {
  style?: object,
  value: number,
  range: [number, number],
  onChange: (value: number) => any,
  logarithmic?: boolean,
};

// TODO: gray out progress bar when auto is being used? remove entirely?
// (potential) TODO: currently only works when vertical due to how PanResponder handles event locations, change if adding rotation
const Slider: React.FC<SliderProps> = ({
  value: valueProp,
  range,
  onChange: handleChange,
  style = {},
  logarithmic = false,
}) => {
  const [lower, upper] = range;
  const value = React.useRef(new Animated.Value(valueProp)).current;
  const sliderRef = React.useRef<View>(null);
  const [sliderElementInfo, setSliderElementInfo] = React.useState<SliderElementInfo>();
  const [pressed, setPressed] = React.useState(false);

  // Layout information for interpolating values
  const layout: SliderElementInfo = sliderElementInfo || { x: 0, y: 0, width: 20, height: 150 };
  const inputRange = logarithmic ? (
    [
      lower,
      interpolate(0.001, lower, upper),
      interpolate(0.01, lower, upper),
      interpolate(0.1, lower, upper),
      upper
    ]
   ) : [lower, upper];
   const outputRange = logarithmic ? (
    [
      0,
      0.25 * layout.height,
      0.5 * layout.height,
      0.75 * layout.height,
      layout.height,
    ]
   ) : [0, layout.height]

  // Respond to touch events
  const panResponder = React.useMemo(() => {
    const updateValueFromEvent = (e: GestureResponderEvent) => {
        // Transform value to range [0, 1] depending on position of slider
        const sliderProgress = clamp((e.nativeEvent.pageY - layout.y) / layout.height, 0, 1);

        // Transform to actual range [lower, upper]
        let newValue;
        // Logarithmic: find appropriate scale value
        if (logarithmic) {
          if (sliderProgress < 0.25) newValue = interpolate(sliderProgress * 4, inputRange[0], inputRange[1]);
          else if (sliderProgress < 0.5) newValue = interpolate((sliderProgress - 0.25) * 4, inputRange[1], inputRange[2]);
          else if (sliderProgress < 0.75) newValue = interpolate((sliderProgress - 0.5) * 4, inputRange[2], inputRange[3]);
          else newValue = interpolate((sliderProgress - 0.75) * 4, inputRange[3], inputRange[4]);
        }
        //Non-logarithmic: interpolate directly
        else newValue = interpolate(sliderProgress, lower, upper);

        value.setValue(newValue);
        handleChange(newValue);
    };
    return PanResponder.create({
      onPanResponderGrant: (e) => {
        setPressed(true);
        updateValueFromEvent(e);
      },
      onPanResponderRelease: () => setPressed(false),
      onPanResponderMove: (e) => {
        updateValueFromEvent(e);
      }
    });
  }, [sliderElementInfo]);

  // Create slider knob that gives feedback when pressed and moves with touch
  let slider = undefined;
  if (sliderElementInfo) {
    const sliderFilledWidth = value.interpolate({
        inputRange,
        outputRange,
        extrapolate: "clamp",
    });
    const sliderKnobStyle = {
      ...styles.sliderKnobOuter,
      ...(pressed ? styles.sliderPressed : {}),
      left: sliderFilledWidth,
    };

    slider = (
      <>
        <View style={styles.sliderBarContainer}>
          <Animated.View style={{ ...styles.sliderBarFilled, width: sliderFilledWidth }} />
          <View style={{ ...styles.sliderBarUnfilled }} />
        </View>
        <Animated.View style={sliderKnobStyle} pointerEvents="none">
          <View style={styles.sliderKnobInner} />
        </Animated.View>
      </>
    );
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    sliderRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      // Rerender component now that slider knob location can be calculated
      setSliderElementInfo({
        x: pageX,
        y: pageY,
        width,
        height,
      });
    });
  };

  return (
    <View style={style} pointerEvents="auto">
      <View
        style={styles.sliderContainer}
        ref={sliderRef}
        hitSlop={16}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
        onStartShouldSetResponderCapture={() => true}
      >
        {slider}
      </View>
    </View>
  );
};

export default Slider;
