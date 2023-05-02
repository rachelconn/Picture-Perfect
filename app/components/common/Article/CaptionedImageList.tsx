import React from 'react';
import { View } from 'react-native';
import Typography from '../Typography/Typography';
import ImageBase from './ImageBase';
import styles from './styles';

interface CaptionedImageListProps {
  caption?: string,
  sources: any[],
}

const CaptionedImageList: React.FC<CaptionedImageListProps> = ({ caption, sources }) => {
  const captionElement = caption && <Typography variant="caption" style={styles.imageCaption}>{caption}</Typography>;

  const images: JSX.Element[] = sources.map((source) => (
    <View style={styles.listedImageContainer}>
      <ImageBase source={source} widthRatio={0.4} key={source} />
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
