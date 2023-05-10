import React from 'react';
import { View } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import Typography from '../Typography/Typography';
import ImageBase from './ImageBase';
import styles from './styles';

interface CaptionedImageListProps {
  caption?: string,
  sources: ImageSourcePropType[],
}

const CaptionedImageList: React.FC<CaptionedImageListProps> = ({ caption, sources }) => {
  const captionElement = caption && <Typography variant="caption" style={styles.imageCaption}>{caption}</Typography>;

  const images: JSX.Element[] = sources.map((source) => (
    <View style={styles.listedImageContainer} key={source}>
      <ImageBase source={source} widthRatio={0.4} />
    </View>
  ));

  return (
    <View style={styles.imageContainer}>
      <View style={styles.listedImagesContainer}>
        {images}
      </View>
      {captionElement}
    </View>
  );
};

export default CaptionedImageList;
