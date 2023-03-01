import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Typography from '../Typography/Typography';
import styles from './styles';

interface CaptionedImageListProps {
  caption?: string,
  sources: any[],
}

const CaptionedImageList: React.FC<CaptionedImageListProps> = ({ caption, sources }) => {
  const captionElement = caption && <Typography variant="caption" style={styles.imageCaption}>{caption}</Typography>;

  const windowSize = Dimensions.get('window');
  const imageRenderWidth = windowSize.width * 0.4;

  const images: JSX.Element[] = sources.map((source) => {
    const { height, width } = Image.resolveAssetSource(source);
    const imageStyle = {
      width: imageRenderWidth,
      height: (height / width) * imageRenderWidth,
      margin: windowSize.width * 0.01,
    };
    return <Image style={imageStyle} source={source} resizeMode="cover" key={source} />;
  });

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
