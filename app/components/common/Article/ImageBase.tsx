import React from 'react';
import { Dimensions, Image, ImageSourcePropType, TouchableHighlight } from 'react-native';
import { Portal } from 'react-native-paper';
import styles from './styles';
import ZoomableImage from './ZoomableImage';

interface ImageSize {
  width: number;
  height: number;
}

interface ImageBaseProps {
  source: ImageSourcePropType;
  // What proportion of the screen's width to take up
  widthRatio: number;
  imageSize?: ImageSize;
}

const ImageBase: React.FC<ImageBaseProps> = ({ source, widthRatio, imageSize }) => {
  const [focused, setFocused] = React.useState(false);

  // Get image dimensions
  const { width: imageWidth, height: imageHeight } = imageSize ?? Image.resolveAssetSource(source);
  const windowSize = Dimensions.get('window');

  // Calculate inline image styles
  const renderWidth = windowSize.width * widthRatio;
  const inlineImageWidth = renderWidth;
  const inlineImageHeight = imageHeight / imageWidth * renderWidth;
  const inlineImageStyle = {
    width: inlineImageWidth,
    height: inlineImageHeight,
  };
  const inlineImageComponent = <Image style={inlineImageStyle} source={source} resizeMode="cover" />;

  // Render full screen zoomable/pannable image when focused
  const initialScale = windowSize.width / imageWidth;
  return focused ? (
    <>
      {inlineImageComponent}
      <Portal>
        <ZoomableImage
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          initialScale={initialScale}
          minScale={initialScale}
          maxScale={initialScale * 3}
          source={source}
          style={styles.focusedImageContainer}
          onPress={() => setFocused(false)}
        />
      </Portal>
    </>
  ) : (
    <TouchableHighlight onPress={() => setFocused(true)}>
      {inlineImageComponent}
    </TouchableHighlight>
  );
};

export default ImageBase;
