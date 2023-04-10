import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Typography from '../Typography/Typography';
import styles from './styles';

interface CaptionedImageProps {
  caption?: string,
  source: any,
}

const CaptionedImage: React.FC<CaptionedImageProps> = ({ caption, source }) => {
  const captionElement = caption && <Typography variant="caption" style={styles.imageCaption}>{caption}</Typography>;

  const { height, width } = Image.resolveAssetSource(source);
  const windowSize = Dimensions.get('window');
  const renderWidth = windowSize.width * 0.7;
  const imageStyle = {
    width: renderWidth,
    height: height / width * renderWidth,
    marginBottom: windowSize.width * 0.01,
  }

  return (
    <View style={styles.imageContainer}>
      <Image style={imageStyle} source={source} resizeMode="cover" />
      {captionElement}
    </View>
  );
};

export default CaptionedImage;
