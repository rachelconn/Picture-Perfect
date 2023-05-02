import React from 'react';
import { Dimensions, GestureResponderEvent, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import ImageZoom, { ICenterOn } from 'react-native-image-pan-zoom';
import { Modal, Portal } from 'react-native-paper';
import styles from './styles';

interface ImageBaseProps {
  source: any;
  // What proportion of the screen's width to take up
  widthRatio: number;
}

const ImageBase: React.FC<ImageBaseProps> = ({ source, widthRatio }) => {
  const [focused, setFocused] = React.useState(false);

  const { height, width } = Image.resolveAssetSource(source);
  const windowSize = Dimensions.get('window');
  const renderWidth = windowSize.width * widthRatio;
  const imageWidth = renderWidth;
  const imageHeight = height / width * renderWidth;
  const imageStyle = {
    width: imageWidth,
    height: imageHeight,
  };

  const imageComponent = <Image style={imageStyle} source={source} resizeMode="cover" />;

  const defaultScale = windowSize.width / imageWidth

  const imageCenter: ICenterOn = {
    x: 0,
    y: 0,
    scale: defaultScale,
    duration: 0,
  };

  // Render full screen zoomable/pannable image when focused
  return focused ? (
    <>
      {imageComponent}
      <Portal>
        <ImageZoom
          style={styles.focusedImageContainer}
          cropWidth={windowSize.width}
          cropHeight={windowSize.height}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          maxScale={defaultScale * 1.5}
          centerOn={imageCenter}
          onClick={() => setFocused(false)}
        >
          {imageComponent}
        </ImageZoom>
      </Portal>
    </>
  ) : (
    <TouchableHighlight onPress={() => setFocused(true)}>
      {imageComponent}
    </TouchableHighlight>
  );
};

export default ImageBase;
