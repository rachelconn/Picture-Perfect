import React from 'react';
import { View } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import Typography from '../Typography/Typography';
import ImageBase from './ImageBase';
import styles from './styles';

interface CaptionedImageProps {
  caption?: string,
  source: ImageSourcePropType,
}

const CaptionedImage: React.FC<CaptionedImageProps> = ({ caption, source }) => {
  const captionElement = caption && <Typography variant="caption" style={styles.imageCaption}>{caption}</Typography>;

  return (
    <View style={styles.imageContainer}>
      <ImageBase source={source} widthRatio={0.7} />
      {captionElement}
    </View>
  );
};

export default CaptionedImage;
